import Link from 'next/link';
import { Textfield } from '@/components/Inputs/Textfield';
import { Button } from '@/components/Inputs/Button';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createSupabaseServer } from '@/services/supabase/server';

export default function LoginPage() {
	async function signIn(formData: FormData) {
		'use server';

		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const cookieStore = cookies();
		const supabase = createSupabaseServer(cookieStore);

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			return redirect('/login?message=Could not authenticate user');
		}

		return redirect('/app/dashboard');
	}

	return (
		<main className="w-screen h-full grid place-items-center p-4 bg-gray-200">
			<div className="max-w-7xl">
				<form className="flex flex-col gap-2" action={signIn}>
					<Textfield
						label="email"
						placeholder="email"
						type="email"
						id="email"
					/>
					<Textfield
						label="password"
						placeholder="password"
						type="password"
						id="password"
					/>
					<Button type="submit">LOG IN</Button>
					<Link href="/sign-up" className="p-2 text-center">
						CREATE ACCOUNT
					</Link>
					<Link href="/forgot-password" className="p-2 text-center">
						FORGOT PASSWORD
					</Link>
				</form>
			</div>
		</main>
	);
}
