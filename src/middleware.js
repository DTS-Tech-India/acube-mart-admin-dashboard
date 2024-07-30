import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { getSession, updateSession } from './lib/session'

 //const superAdminRoutes = ['/dashboard/admin'] 
 const adminRoutes = ['/dashboard/admins']
 
// This function can be marked `async` if using `await` inside
export async function middleware(request) {
    
    const path = request.nextUrl.pathname
    //console.log(path)
    
    const session = await getSession()
    
    if(!session) return NextResponse.redirect(new URL('/signin', request.url))

    const role = await session.admin.role
    //console.log(role);

    //if(role === 'admin' && superAdminRoutes.includes(path)) return NextResponse.redirect(new URL('/unauthorized', request.url))
    
    if(role === 'manager' && (/* superAdminRoutes.includes(path) || */ adminRoutes.includes(path))) return NextResponse.redirect(new URL('/unauthorized', request.url))

  return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/dashboard/:path*']
}