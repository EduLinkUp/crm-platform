import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"

// In-memory user store
let users: any[] = [
  {
    id: "demo-user-1",
    email: "admin@neonflow.com",
    name: "Demo Admin",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password123
    role: "ADMIN",
    createdAt: new Date().toISOString(),
  }
]

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    // Find user
    const user = users.find(u => u.email === email)
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    return NextResponse.json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      }
    })

  } catch (error) {
    console.error("Credentials error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
