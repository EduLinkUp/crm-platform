import { NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"

export async function POST(req: NextRequest) {
  const body = await req.text()
  
  // Simple webhook handler for demo
  console.log(`Webhook received: ${body.substring(0, 100)}...`)

  return NextResponse.json({ received: true })
}
