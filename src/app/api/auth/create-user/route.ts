import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"

// In-memory user store for demo purposes
let users: any[] = []

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json()

    // Check if user already exists
    const existingUser = users.find(u => u.email === email)
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = {
      id: Date.now().toString(),
      email,
      name,
      password: hashedPassword,
      role: "USER",
      createdAt: new Date().toISOString(),
    }

    users.push(user)

    return NextResponse.json(
      { 
        message: "User created successfully",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      },
      { status: 201 }
    )

  } catch (error) {
    console.error("Create user error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// Login endpoint
export async function GET(req: NextRequest) {
  try {
    // Create demo user if not exists
    if (users.length === 0) {
      const hashedPassword = await bcrypt.hash("password123", 10)
      users.push({
        id: "demo-user-1",
        email: "admin@neonflow.com",
        name: "Demo Admin",
        password: hashedPassword,
        role: "ADMIN",
        createdAt: new Date().toISOString(),
      })
    }

    return NextResponse.json({
      message: "Demo user created",
      credentials: {
        email: "admin@neonflow.com",
        password: "password123"
      }
    })
  } catch (error) {
    console.error("Demo setup error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
