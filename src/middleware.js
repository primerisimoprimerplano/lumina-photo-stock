import { NextResponse } from 'next/server';

export function middleware(request) {
  // Only protect /admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Exclude the login page and api routes
    if (request.nextUrl.pathname === '/admin/login' || request.nextUrl.pathname.startsWith('/api/admin/login')) {
      return NextResponse.next();
    }
    
    // Check for the admin session cookie
    let cookie = request.cookies.get('admin_session');
    
    if (!cookie || cookie.value !== 'authenticated') {
      // Redirect to login if not authenticated
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
