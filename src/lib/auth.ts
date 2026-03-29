// Middleware for role-based access control
import { NextRequest, NextResponse } from 'next/server';

export type UserRole = 'ADMIN' | 'MANAGER' | 'SALESPERSON' | 'USER';

interface DecodedUser {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

/**
 * Decode user from localStorage (passed via header)
 * In production, use JWT tokens instead
 */
export function getUserFromRequest(request: NextRequest): DecodedUser | null {
  try {
    const userId = request.headers.get('x-user-id');
    const userEmail = request.headers.get('x-user-email');
    const userRole = request.headers.get('x-user-role');
    const userName = request.headers.get('x-user-name');

    if (!userId || !userEmail || !userRole) {
      return null;
    }

    return {
      id: userId,
      email: userEmail,
      role: userRole as UserRole,
      name: userName || 'User',
    };
  } catch (error) {
    return null;
  }
}

/**
 * Check if user has required role
 */
export function hasRole(userRole: UserRole, requiredRoles: UserRole[]): boolean {
  return requiredRoles.includes(userRole);
}

/**
 * Check if user is admin
 */
export function isAdmin(userRole: UserRole): boolean {
  return userRole === 'ADMIN';
}

/**
 * Check if user is manager or above
 */
export function isManagerOrAbove(userRole: UserRole): boolean {
  return userRole === 'ADMIN' || userRole === 'MANAGER';
}

/**
 * Verify user has required role or return error
 */
export function requireRole(
  userRole: UserRole | null,
  requiredRoles: UserRole[]
): NextResponse | null {
  if (!userRole) {
    return NextResponse.json(
      { error: 'Unauthorized: No user session' },
      { status: 401 }
    );
  }

  if (!hasRole(userRole, requiredRoles)) {
    return NextResponse.json(
      { error: `Forbidden: Requires roles: ${requiredRoles.join(', ')}` },
      { status: 403 }
    );
  }

  return null;
}
