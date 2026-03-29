import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import type { Prisma } from '@prisma/client';

// GET /api/audit-logs - Fetch audit logs (ADMIN only)
export async function GET(request: NextRequest) {
  try {
    const userRole = request.headers.get('x-user-role');
    
    // Only admins can view audit logs
    if (userRole !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Forbidden: Admin access required' },
        { status: 403 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '50');
    const action = searchParams.get('action');

    const where: Prisma.AuditLogWhereInput = {};
    if (action) where.action = action;

    const logs = await prisma.auditLog.findMany({
      where,
      include: {
        user: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    return NextResponse.json({ data: logs, count: logs.length });
  } catch (error) {
    console.error('Failed to fetch audit logs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch audit logs' },
      { status: 500 }
    );
  }
}

/**
 * Helper function to log actions
 * Call this from other API routes
 */
export async function logAuditAction(
  userId: string,
  action: string, // CREATE, UPDATE, DELETE, LOGIN, EXPORT
  entityType: string, // Contact, Deal, User, etc.
  entityId: string,
  changes?: Record<string, string | number | boolean | null>
) {
  try {
    await prisma.auditLog.create({
      data: {
        userId,
        action,
        entityType,
        entityId,
        changes: changes ? JSON.stringify(changes) : null,
        ipAddress: '0.0.0.0', // Would need to extract from request
      },
    });
  } catch (error) {
    console.error('Audit log creation failed:', error);
    // Don't fail the main operation if audit logging fails
  }
}
