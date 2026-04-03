import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { logAuditAction } from '@/app/api/audit-logs/route';

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  role: z.enum(['ADMIN', 'MANAGER', 'SALESPERSON', 'USER']).default('SALESPERSON'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('💠 SIGNUP INPUT:', body);
    
    // Validate input
    const validatedData = signupSchema.parse(body);
    console.log('💠 VALIDATED DATA:', validatedData);
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      console.log('⚠️  EMAIL ALREADY EXISTS:', validatedData.email);
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);
    console.log('💠 PASSWORD HASHED:', { originalLength: validatedData.password.length, hashLength: hashedPassword.length });

    // Create user
    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
        role: validatedData.role,
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    console.log('✅ USER CREATED:', { id: user.id, email: user.email, role: user.role });

    // Log audit action
    await logAuditAction(
      user.id,
      'CREATE',
      'User',
      user.id,
      { email: validatedData.email, role: validatedData.role }
    );

    return NextResponse.json(
      {
        message: 'User created successfully',
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }

    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
