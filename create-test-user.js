const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

(async () => {
  try {
    // Check if user already exists
    const existing = await prisma.user.findUnique({
      where: { email: 'test@example.com' }
    });
    
    if (existing) {
      console.log('✅ User already exists:', existing.email);
      console.log('USE: Email: test@example.com, Password: TestPassword123');
      await prisma.$disconnect();
      return;
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash('TestPassword123', 10);
    console.log('🔐 Password hashed');
    
    // Create user
    const user = await prisma.user.create({
      data: {
        name: 'Test User',
        email: 'test@example.com',
        password: hashedPassword,
        role: 'ADMIN',
        isActive: true,
      }
    });
    
    console.log('✅ USER CREATED SUCCESSFULLY!');
    console.log('Email: test@example.com');
    console.log('Password: TestPassword123');
    console.log('Role: ADMIN');
    
  } catch (e) {
    console.error('❌ Error:', e.message);
  } finally {
    await prisma.$disconnect();
  }
})();
