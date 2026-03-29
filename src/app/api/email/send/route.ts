import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const sendEmailSchema = z.object({
  to: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required'),
  html: z.string().min(1, 'Email body is required'),
  contactId: z.string().optional(),
});

// Initialize email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request: NextRequest) {
  try {
    // Validate required environment variables
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Email service not configured',
          code: 'EMAIL_CONFIG_MISSING'
        },
        { status: 503 }
      );
    }

    const body = await request.json();
    const validatedData = sendEmailSchema.parse(body);

    // Send email
    const result = await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.SMTP_USER,
      to: validatedData.to,
      subject: validatedData.subject,
      html: validatedData.html,
    });

    // Log activity if contactId provided
    if (validatedData.contactId) {
      try {
        await prisma.activity.create({
          data: {
            type: 'EMAIL',
            title: validatedData.subject,
            description: `Email sent to ${validatedData.to}`,
            contactId: validatedData.contactId,
            userId: 'temp-user-id', // Replace with actual user
          },
        });
      } catch (error) {
        console.error('Failed to log email activity:', error);
        // Don't fail the response if logging fails
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Email sent successfully',
        messageId: result.messageId,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
