import Link from 'next/link';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { createSupabaseServer } from '@/services/supabase/server';
import { Textfield } from '@/components/Inputs/Textfield';
import { Button } from '@/components/Inputs/Button';

export default function ForgotPasswordPage() {
	async function signIn(formData: FormData) {
		'use server';

		const origin = headers().get('origin');
		const email = formData.get('email') as string;
		const cookieStore = cookies();
		const supabase = createSupabaseServer(cookieStore);

		const { error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: `${origin}/reset-password`,
		});

		if (error) {
			return redirect('/forgot-password?message=Could not find user');
		}

		return redirect(
			'/forgot-password?message=Check your email for a reset link',
		);
	}

	return (
		<main className="w-screen h-full grid place-items-center p-4 bg-gray-200">
			<div className="max-w-7xl">
				<form className="flex flex-col gap-2" action={signIn}>
					<Textfield placeholder="email" type="email" name="email" />
					<Button type="submit">LOG IN</Button>
				</form>
			</div>
		</main>
	);
}
