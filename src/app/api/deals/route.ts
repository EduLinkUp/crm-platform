import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { Prisma } from '@prisma/client';
import { z } from 'zod';

const createDealSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  stage: z.enum(['LEAD', 'PROSPECT', 'PROPOSAL', 'NEGOTIATION', 'CLOSED_WON', 'CLOSED_LOST']),
  value: z.number().min(0, 'Value must be positive'),
  probability: z.number().min(0).max(100, 'Probability must be between 0 and 100'),
  expectedCloseDate: z.string().datetime(),
  contactId: z.string(),
  userId: z.string(),
});

// POST /api/deals - Create a new deal
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createDealSchema.parse(body);

    // Verify contact and user exist
    const [contact, user] = await Promise.all([
      prisma.contact.findUnique({ where: { id: validatedData.contactId } }),
      prisma.user.findUnique({ where: { id: validatedData.userId } }),
    ]);

    if (!contact || !user) {
      return NextResponse.json(
        { error: 'Invalid contact or user ID' },
        { status: 400 }
      );
    }

    const deal = await prisma.deal.create({
      data: {
        ...validatedData,
        expectedCloseDate: new Date(validatedData.expectedCloseDate),
      },
      include: {
        contact: {
          select: { firstName: true, lastName: true, company: true },
        },
        user: {
          select: { name: true },
        },
      },
    });

    return NextResponse.json(
      { message: 'Deal created successfully', deal },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }

    console.error('Deal creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET /api/deals - Fetch all deals
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const stage = searchParams.get('stage');
    const userId = searchParams.get('userId');

    const where: Prisma.DealWhereInput = {};
    if (stage) where.stage = stage as 'LEAD' | 'PROSPECT' | 'PROPOSAL' | 'NEGOTIATION' | 'CLOSED_WON' | 'CLOSED_LOST';
    if (userId) where.userId = userId;

    const deals = await prisma.deal.findMany({
      where,
      include: {
        contact: {
          select: { id: true, firstName: true, lastName: true, company: true },
        },
        user: {
          select: { id: true, name: true },
        },
      },
      orderBy: { expectedCloseDate: 'asc' },
    });

    const total = await prisma.deal.count({ where });

    return NextResponse.json(
      { data: deals, total, count: deals.length },
      { status: 200 }
    );
  } catch (error) {
    console.error('Fetch deals error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
