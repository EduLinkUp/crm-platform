import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const updateContactSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  notes: z.string().optional(),
});

// GET /api/contacts/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const contact = await prisma.contact.findUnique({
      where: { id },
      include: {
        leads: true,
        deals: true,
        activities: { take: 10, orderBy: { createdAt: 'desc' } },
        attachments: true,
      },
    });

    if (!contact) {
      return NextResponse.json(
        { success: false, error: 'Contact not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: contact },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching contact:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch contact' },
      { status: 500 }
    );
  }
}

// PUT /api/contacts/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validatedData = updateContactSchema.parse(body);

    const contact = await prisma.contact.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json(
      { success: true, data: contact, message: 'Contact updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Error updating contact:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update contact' },
      { status: 500 }
    );
  }
}

// DELETE /api/contacts/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.contact.delete({
      where: { id },
    });

    return NextResponse.json(
      { success: true, message: 'Contact deleted successfully' },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error && 'code' in error && error.code === 'P2025') {
      return NextResponse.json(
        { success: false, error: 'Contact not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    console.error('Error deleting contact:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete contact' },
      { status: 500 }
    );
  }
}
