import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clean up existing data
  await prisma.interaction.deleteMany();
  await prisma.attachment.deleteMany();
  await prisma.note.deleteMany();
  await prisma.activity.deleteMany();
  await prisma.task.deleteMany();
  await prisma.deal.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.contact.deleteMany();
  await prisma.team.deleteMany();
  await prisma.user.deleteMany();

  // Create admin user
  const hashedPassword = await bcrypt.hash('demo123456', 10);
  const adminUser = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@demo.com',
      password: hashedPassword,
      role: 'ADMIN',
      department: 'Management',
      phone: '555-0001',
      isActive: true,
    },
  });

  // Create sales users
  const salesUser1 = await prisma.user.create({
    data: {
      name: 'John Sales',
      email: 'john@demo.com',
      password: hashedPassword,
      role: 'SALESPERSON',
      department: 'Sales',
      phone: '555-0010',
      isActive: true,
    },
  });

  const salesUser2 = await prisma.user.create({
    data: {
      name: 'Sarah Manager',
      email: 'sarah@demo.com',
      password: hashedPassword,
      role: 'MANAGER',
      department: 'Sales',
      phone: '555-0011',
      isActive: true,
    },
  });

  // Create sample contacts
  const contacts = await Promise.all([
    prisma.contact.create({
      data: {
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice@acmecorp.com',
        phone: '555-1001',
        company: 'Acme Corporation',
        jobTitle: 'CTO',
        city: 'San Francisco',
        state: 'CA',
        country: 'USA',
        source: 'WEBSITE',
        segment: 'Enterprise',
        userId: salesUser1.id,
        isActive: true,
      },
    }),
    prisma.contact.create({
      data: {
        firstName: 'Bob',
        lastName: 'Smith',
        email: 'bob@techstart.io',
        phone: '555-1002',
        company: 'TechStart Inc',
        jobTitle: 'CEO',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        source: 'REFERRAL',
        segment: 'SMB',
        userId: salesUser1.id,
        isActive: true,
      },
    }),
    prisma.contact.create({
      data: {
        firstName: 'Carol',
        lastName: 'Davis',
        email: 'carol@innovate.com',
        phone: '555-1003',
        company: 'Innovate Solutions',
        jobTitle: 'VP Sales',
        city: 'Austin',
        state: 'TX',
        country: 'USA',
        source: 'COLD_CALL',
        segment: 'Mid-Market',
        userId: salesUser2.id,
        isActive: true,
      },
    }),
    prisma.contact.create({
      data: {
        firstName: 'David',
        lastName: 'Wilson',
        email: 'david@globaltech.co.uk',
        phone: '555-1004',
        company: 'Global Tech Ltd',
        jobTitle: 'Director',
        city: 'London',
        country: 'UK',
        source: 'TRADE_SHOW',
        segment: 'Enterprise',
        userId: salesUser2.id,
        isActive: true,
      },
    }),
    prisma.contact.create({
      data: {
        firstName: 'Emma',
        lastName: 'Brown',
        email: 'emma@startup.ai',
        phone: '555-1005',
        company: 'StartUp AI',
        jobTitle: 'Founder',
        city: 'Boston',
        state: 'MA',
        country: 'USA',
        source: 'EMAIL',
        segment: 'Startup',
        userId: salesUser1.id,
        isActive: true,
      },
    }),
  ]);

  console.log(`✅ Created ${contacts.length} contacts`);

  // Create leads for contacts
  const leads = await Promise.all([
    prisma.lead.create({
      data: {
        title: 'Enterprise Software Implementation',
        status: 'QUALIFIED',
        source: 'WEBSITE',
        budget: 500000,
        priority: 'HIGH',
        probability: 75,
        expectedCloseDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        userId: salesUser1.id,
        contactId: contacts[0].id,
      },
    }),
    prisma.lead.create({
      data: {
        title: 'Cloud Migration Project',
        status: 'CONTACTED',
        source: 'REFERRAL',
        budget: 250000,
        priority: 'MEDIUM',
        probability: 50,
        expectedCloseDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
        userId: salesUser1.id,
        contactId: contacts[1].id,
      },
    }),
    prisma.lead.create({
      data: {
        title: 'Security Audit Services',
        status: 'QUALIFIED',
        source: 'COLD_CALL',
        budget: 150000,
        priority: 'HIGH',
        probability: 60,
        expectedCloseDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
        userId: salesUser2.id,
        contactId: contacts[2].id,
      },
    }),
  ]);

  console.log(`✅ Created ${leads.length} leads`);

  // Create deals
  const deals = await Promise.all([
    prisma.deal.create({
      data: {
        title: 'Acme - Enterprise Suite',
        stage: 'PROPOSAL',
        value: 450000,
        probability: 70,
        expectedCloseDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
        userId: salesUser1.id,
        contactId: contacts[0].id,
      },
    }),
    prisma.deal.create({
      data: {
        title: 'TechStart - Cloud Platform',
        stage: 'NEGOTIATION',
        value: 200000,
        probability: 45,
        expectedCloseDate: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
        userId: salesUser1.id,
        contactId: contacts[1].id,
      },
    }),
    prisma.deal.create({
      data: {
        title: 'Innovate - Integration Services',
        stage: 'CLOSED_WON',
        value: 125000,
        probability: 100,
        expectedCloseDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        actualCloseDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        userId: salesUser2.id,
        contactId: contacts[2].id,
      },
    }),
    prisma.deal.create({
      data: {
        title: 'Global Tech - Support Plan',
        stage: 'LEAD',
        value: 50000,
        probability: 25,
        expectedCloseDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        userId: salesUser2.id,
        contactId: contacts[3].id,
      },
    }),
    prisma.deal.create({
      data: {
        title: 'StartUp AI - Pilot Program',
        stage: 'PROPOSAL',
        value: 75000,
        probability: 55,
        expectedCloseDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        userId: salesUser1.id,
        contactId: contacts[4].id,
      },
    }),
  ]);

  console.log(`✅ Created ${deals.length} deals`);

  // Create activities
  const activities = await Promise.all([
    prisma.activity.create({
      data: {
        type: 'CALL',
        title: 'Initial Discovery Call',
        description: 'Called Alice to discuss business needs',
        duration: 30,
        location: 'Phone',
        userId: salesUser1.id,
        contactId: contacts[0].id,
      },
    }),
    prisma.activity.create({
      data: {
        type: 'EMAIL',
        title: 'Sent Proposal',
        description: 'Sent proposal for Enterprise Suite',
        duration: 5,
        location: 'Email',
        userId: salesUser1.id,
        contactId: contacts[0].id,
      },
    }),
    prisma.activity.create({
      data: {
        type: 'MEETING',
        title: 'Demo Session',
        description: 'Conducted product demo for TechStart team',
        duration: 60,
        location: 'Zoom',
        userId: salesUser1.id,
        contactId: contacts[1].id,
      },
    }),
  ]);

  console.log(`✅ Created ${activities.length} activities`);

  console.log('🎉 Database seed completed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Seed error:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
