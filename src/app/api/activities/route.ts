import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const createActivitySchema = z.object({
  type: z.enum(['CALL', 'EMAIL', 'MEETING', 'NOTE', 'TASK']),
  title: z.string().min(1, 'Title required'),
  description: z.string().optional(),
  contactId: z.string(),
  dealId: z.string().optional(),
});

// GET /api/activities - Fetch activities
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const contactId = searchParams.get('contactId');
    const dealId = searchParams.get('dealId');
    const limit = parseInt(searchParams.get('limit') || '10');

    interface ActivityWhere {
      contactId?: string;
      dealId?: string;
    }
    const where: ActivityWhere = {};
    if (contactId) where.contactId = contactId;
    if (dealId) where.dealId = dealId;

    const activities = await prisma.activity.findMany({
      where,
      include: {
        user: { select: { id: true, name: true } },
        contact: { select: { id: true, firstName: true, lastName: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    return NextResponse.json({ data: activities });
  } catch (error) {
    console.error('Failed to fetch activities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch activities' },
      { status: 500 }
    );
  }
}

// POST /api/activities - Create activity
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createActivitySchema.parse(body);

    const userId = request.headers.get('x-user-id');
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 401 }
      );
    }

    const activity = await prisma.activity.create({
      data: {
        type: validatedData.type,
        title: validatedData.title,
        description: validatedData.description,
        contactId: validatedData.contactId,
        dealId: validatedData.dealId,
        userId,
      },
      include: {
        user: { select: { name: true } },
        contact: { select: { firstName: true, lastName: true } },
      },
    });

    return NextResponse.json(
      { message: 'Activity created', data: activity },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to create activity' },
      { status: 500 }
    );
  }
}
