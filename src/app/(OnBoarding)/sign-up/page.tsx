import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { createSupabaseServer } from '@/services/supabase/server';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { SubmitButton } from '@/components/SubmitButton';

export default function SignUpPage() {
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
		<form className="flex flex-col gap-2" action={signUp}>
			<Input placeholder="name" type="text" name="name" />
			<Input placeholder="email" type="email" name="email" />
			<Input placeholder="password" type="password" name="password" />
			<SubmitButton color="primary" type="submit">
				CREATE
			</SubmitButton>
		</form>
	);
}
