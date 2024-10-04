import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { getSession, updateSession } from './lib/session'
 
export async function middleware(request) {
    
    const path = request.nextUrl.pathname
    //console.log(path)
    
    const session = await getSession()
    
    if(!session) return NextResponse.redirect(new URL('/signin', request.url))

    const role = await session.admin.role
    //console.log(role);

    if (role === 'manager' && (path.startsWith('/admins') || path.startsWith('/settings'))) return NextResponse.redirect(new URL('/unauthorized', request.url))

  return NextResponse.next()
}
 
//Matching Paths
export const config = {
  matcher: ['/', '/admins/:path*', '/settings/:path*', '/products/:path*', '/categories/:path*', '/orders/:path*', '/customers/:path*', '/transactions/:path*', '/coupons/:path*', '/support/:path*'],
}