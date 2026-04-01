import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  // Authentication is temporarily disabled
  const response = NextResponse.next();
  
  // Provide mock values for downstream routes that expect these headers
  response.headers.set('X-User-ID', 'mock-admin-id');
  response.headers.set('X-User-Role', 'Admin');
  
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
