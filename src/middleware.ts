import { type NextRequest, NextResponse } from 'next/server';
import { createSupabaseMiddleware } from '@/services/supabase/middleware';

const openRoutes = ['/', '/login', '/sign-up'];
const privateRoutes = ['/app/dashboard'];

export async function middleware(req: NextRequest) {
	// TODO: extract this to a method
	const res = NextResponse.next();
	const { supabase, response } = createSupabaseMiddleware(req);

	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (session && openRoutes.includes(req.nextUrl.pathname)) {
		return NextResponse.redirect(new URL('/app/dashboard', req.url));
	}

	if (!session && privateRoutes.includes(req.nextUrl.pathname)) {
		return NextResponse.redirect(new URL('/login', req.url));
	}

	return res;
}

export const config = {
	matcher: [
		'/((?!_next/static|_next/image|favicon.ico).*)',
		'/',
		'/login',
		'/sign-up',
		'/app/dashboard',
	],
};
