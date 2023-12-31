import { Textfield } from '@/components/Inputs/Textfield';
import { Button } from '@/components/Inputs/Button';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { createSupabaseServer } from '@/services/supabase/server';

export default function AuthPage() {
	const signUp = async (formData: FormData) => {
		'use server';

		const origin = headers().get('origin');
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const cookieStore = cookies();
		const supabase = createSupabaseServer(cookieStore);

		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${origin}/api/auth/callback`,
			},
		});

		if (error) {
			return redirect('/login?message=Could not create user');
		}

		return redirect('/app/dashboard');
	};

	return (
		<main className="w-screen h-full grid place-items-center p-4 bg-gray-200">
			<div className="max-w-7xl">
				<form className="flex flex-col gap-2" action={signUp}>
					<Textfield placeholder="name" type="text" name="name" />
					<Textfield placeholder="email" type="email" name="email" />
					<Textfield placeholder="password" type="password" name="password" />
					<Button type="submit">CREATE</Button>
				</form>
			</div>
		</main>
	);
}
