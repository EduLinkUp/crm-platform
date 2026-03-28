import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAdmin = token?.role === "ADMIN" || token?.role === "SUPER_ADMIN"
    const pathname = req.nextUrl.pathname

    // Admin routes protection
    if (pathname.startsWith("/admin") && !isAdmin) {
      return NextResponse.redirect(new URL("/unauthorized", req.url))
    }

    // API rate limiting based on subscription tier
    if (pathname.startsWith("/api/")) {
      // Add rate limiting logic here based on user's subscription
      // This is a placeholder - implement actual rate limiting
      const tier = token?.subscriptionTier || "STARTER"
      const rateLimits = {
        STARTER: 100,
        PRO: 1000,
        ENTERPRISE: 10000,
      }
      
      // Set rate limit headers
      const response = NextResponse.next()
      response.headers.set("X-RateLimit-Limit", rateLimits[tier as keyof typeof rateLimits].toString())
      return response
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/api/:path*",
    "/settings/:path*",
    "/billing/:path*",
  ],
}
