import { Button } from '@/components/Inputs/Button';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createSupabaseServer } from '@/services/supabase/server';

export default function ClientDashboardPage() {
	const signOut = async () => {
		'use server';

		const cookieStore = cookies();
		const supabase = createSupabaseServer(cookieStore);

		await supabase.auth.signOut();

		return redirect('/login');
	};

	return (
		<main className="w-screen h-full grid place-items-center p-4 bg-gray-200">
			<h1>DASHBOARD</h1>
			<form action={signOut}>
				<Button type="submit">Log out</Button>
			</form>
		</main>
	);
}
