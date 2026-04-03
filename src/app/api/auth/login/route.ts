import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { logAuditAction } from '@/app/api/audit-logs/route';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('🔐 LOGIN ATTEMPT:', { email: body.email, passwordLength: body.password?.length });
    
    // Validate input
    const validatedData = loginSchema.parse(body);
    
    // Find user
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        role: true,
        isActive: true,
      },
    });

    console.log('🔐 USER FOUND:', { found: !!user, email: user?.email, isActive: user?.isActive, hasPassword: !!user?.password });

    if (!user) {
      console.log('❌ USER NOT FOUND IN DATABASE');
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    if (!user.isActive) {
      console.log('❌ USER IS INACTIVE');
      return NextResponse.json(
        { error: 'User account is inactive' },
        { status: 403 }
      );
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(validatedData.password, user.password);
    console.log('🔐 PASSWORD VERIFICATION:', { matched: passwordMatch, storedHashLength: user.password.length });

    if (!passwordMatch) {
      console.log('❌ PASSWORD MISMATCH');
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Return user data (in production, you'd create a session/JWT)
    const { password: _, ...userWithoutPassword } = user;
    
    // Log audit action
    await logAuditAction(
      user.id,
      'LOGIN',
      'User',
      user.id,
      { email: user.email }
    );
    
    console.log('✅ LOGIN SUCCESSFUL:', { id: user.id, email: user.email, role: user.role });
    
    return NextResponse.json(
      {
        message: 'Login successful',
        user: userWithoutPassword,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ LOGIN ERROR:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }

    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
