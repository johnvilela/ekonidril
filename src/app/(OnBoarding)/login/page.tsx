import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createSupabaseServer } from '@/services/supabase/server';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { Link as NextUiLink } from '@nextui-org/link';
import Link from 'next/link';
import { SubmitButton } from '@/components/SubmitButton';

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
		<form className="flex flex-col gap-2" action={signIn}>
			<Input label="email" type="email" name="email" />
			<Input label="password" type="password" name="password" />
			<NextUiLink
				href="/forgot-password"
				color="primary"
				size="sm"
				className="text-right block mb-4"
			>
				Forgot password?
			</NextUiLink>
			<SubmitButton color="primary" type="submit">
				LOG IN
			</SubmitButton>
			<Button as={Link} href="/sign-up" color="secondary" variant="light">
				CREATE ACCOUNT
			</Button>
		</form>
	);
}
