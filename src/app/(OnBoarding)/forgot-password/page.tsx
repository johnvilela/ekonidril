import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { createSupabaseServer } from '@/services/supabase/server';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { SubmitButton } from '@/components/SubmitButton';

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
		<form className="flex flex-col gap-2" action={signIn}>
			<Input placeholder="email" type="email" name="email" />
			<SubmitButton color="primary" type="submit">
				LOG IN
			</SubmitButton>
		</form>
	);
}
