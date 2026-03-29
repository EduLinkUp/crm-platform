import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { logAuditAction } from '@/app/api/audit-logs/route';

// GET /api/export/contacts - Export contacts to CSV
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    const userRole = request.headers.get('x-user-role');

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Only managers and admins can export
    if (!['ADMIN', 'MANAGER'].includes(userRole || '')) {
      return NextResponse.json(
        { error: 'Forbidden: Manager access required' },
        { status: 403 }
      );
    }

    const contacts = await prisma.contact.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        company: true,
        jobTitle: true,
        source: true,
        segment: true,
        isActive: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    // Create CSV content
    const headers = [
      'ID',
      'First Name',
      'Last Name',
      'Email',
      'Phone',
      'Company',
      'Job Title',
      'Source',
      'Segment',
      'Active',
      'Created',
    ];

    const rows = contacts.map((c: typeof contacts[0]) => [
      c.id,
      c.firstName,
      c.lastName,
      c.email,
      c.phone || '',
      c.company || '',
      c.jobTitle || '',
      c.source,
      c.segment || '',
      c.isActive ? 'Yes' : 'No',
      new Date(c.createdAt).toISOString(),
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n');

    // Log export action
    await logAuditAction(userId, 'EXPORT', 'Contact', `all_${contacts.length}`, {
      count: contacts.length,
    });

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="contacts_${Date.now()}.csv"`,
      },
    });
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json(
      { error: 'Failed to export contacts' },
      { status: 500 }
    );
  }
}
