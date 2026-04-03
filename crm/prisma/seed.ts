import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

async function main() {
  // Create a test user
  const hashedPassword = await bcrypt.hash('password123', 10)
  
  const user = await prisma.user.upsert({
    where: { email: 'admin@neonflow.com' },
    update: {},
    create: {
      email: 'admin@neonflow.com',
      name: 'Admin User',
      role: 'ADMIN',
      emailVerified: new Date(),
    },
  })

  // Create default organization
  const organization = await prisma.organization.upsert({
    where: { slug: 'neonflow-workspace' },
    update: {},
    create: {
      name: 'NeonFlow Workspace',
      slug: 'neonflow-workspace',
      owner: {
        connect: { id: user.id }
      }
    },
  })

  // Add user to organization
  await prisma.organizationUser.upsert({
    where: {
      organizationId_userId: {
        organizationId: organization.id,
        userId: user.id,
      },
    },
    update: {},
    create: {
      userId: user.id,
      organizationId: organization.id,
      role: 'ADMIN',
      joinedAt: new Date(),
    },
  })

  console.log('✅ Database seeded successfully!')
  console.log('📧 Login Email: admin@neonflow.com')
  console.log('🔑 Login Password: password123')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
