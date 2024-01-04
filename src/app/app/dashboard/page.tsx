import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createSupabaseServer } from '@/services/supabase/server';
import { Button } from '@nextui-org/button';

export default function ClientDashboardPage() {
	const signOut = async () => {
		'use server';

		const cookieStore = cookies();
		const supabase = createSupabaseServer(cookieStore);

		await supabase.auth.signOut();

		return redirect('/login');
	};

	return (
		<main className="w-screen h-full grid place-items-center p-4">
			<h1>DASHBOARD</h1>
			<form action={signOut}>
				<Button type="submit">Log out</Button>
			</form>
		</main>
	);
}
