const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async () => {
  try {
    const users = await prisma.user.findMany({ take: 5 });
    console.log('📊 Users in database:', users.length);
    if (users.length > 0) {
      console.log('Users:', users.map(u => ({ id: u.id.slice(0, 8), email: u.email, name: u.name, role: u.role })));
    } else {
      console.log('❌ NO USERS FOUND - Database is empty');
    }
  } catch (e) {
    console.error('Database error:', e.message);
  } finally {
    await prisma.$disconnect();
  }
})();
