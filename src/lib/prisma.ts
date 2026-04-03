// Simple in-memory user store for demo purposes
let users: any[] = [
  {
    id: 'demo-user-1',
    email: 'admin@neonflow.com',
    name: 'Demo Admin',
    role: 'ADMIN',
    createdAt: new Date().toISOString(),
  }
]

export const prisma = {
  user: {
    findUnique: async (where: any) => {
      return users.find((u: any) => u.email === where.email) || null
    },
    findMany: async () => users,
    create: async (data: any) => {
      const newUser = {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        ...data,
      }
      users.push(newUser)
      return newUser
    },
    upsert: async ({ where, create, update }: { where: { email: string }, create: any, update?: any }) => {
      const existingUser = users.find(u => u.email === where.email)
      if (existingUser) {
        return existingUser
      }
      
      const newUser = {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        ...create,
      }
      users.push(newUser)
      return newUser
    },
  },
  organization: {
    findUnique: async () => null,
    findMany: async () => [],
    create: async () => null,
  },
  organizationUser: {
    findMany: async () => [],
    create: async () => null,
  },
  $disconnect: async () => {
    // No-op for in-memory store
  },
}
