import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json(
      {
        success: true,
        status: 'healthy',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json(
      {
        success: false,
        status: 'unhealthy',
        error: 'Database connection failed',
      },
      { status: 503 }
    );
  }
}
