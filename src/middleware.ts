import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    // Get the pathname of the request (e.g. /, /dashboard, /sign-in)
    const { pathname } = request.nextUrl;

    // Get the authentication token from cookies
    const authToken = request.cookies.get("auth-token")?.value;

    // Define public paths that don't require authentication
    const publicPaths = ["/sign-in"];

    // Check if the current path is public
    const isPublicPath = publicPaths.includes(pathname);

    // If user is trying to access root path (/)
    if (pathname === "/") {
        if (!authToken) {
            // Not authenticated, redirect to sign-in
            return NextResponse.redirect(new URL("/sign-in", request.url));
        } else {
            // Authenticated, redirect to dashboard
            return NextResponse.redirect(new URL("/dashboard/customers", request.url));
        }
    }

    // If user is not authenticated and trying to access protected route
    if (!authToken && !isPublicPath) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    // If user is authenticated and trying to access sign-in page, redirect to dashboard
    if (authToken && pathname === "/sign-in") {
        return NextResponse.redirect(new URL("/dashboard/customers", request.url));
    }

    // Allow the request to continue
    return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder files
         */
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$).*)",
    ],
};
