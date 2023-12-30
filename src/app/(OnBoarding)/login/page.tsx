import Link from 'next/link';

export default function LoginPage() {
	return (
		<div>
			<div>Login</div>
			<Link href="/sign-up">Sign Up</Link>
		</div>
	);
}
