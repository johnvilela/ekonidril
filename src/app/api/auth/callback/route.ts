import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createSupabaseServer } from '@/services/supabase/server';

export async function GET(request: Request) {
	const requestUrl = new URL(request.url);
	const code = requestUrl.searchParams.get('code');

	if (code) {
		const cookieStore = cookies();
		const supabase = createSupabaseServer(cookieStore);
		await supabase.auth.exchangeCodeForSession(code);
	}

	return NextResponse.redirect(requestUrl.origin);
}
