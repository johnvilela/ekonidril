'use client';

import { ReactNode } from 'react';
import { Navbar } from '@nextui-org/navbar';
import { Button } from '@nextui-org/button';
import { PiCaretLeft } from 'react-icons/pi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function OnBoardingLayout({
	children,
}: {
	children: ReactNode;
}) {
	const pathname = usePathname();

	const isLoginPage = pathname === '/login';

	return (
		<main className="w-screen h-screen">
			<Navbar>
				{!isLoginPage && (
					<Button
						as={Link}
						href="/login"
						isIconOnly
						color="primary"
						variant="bordered"
						aria-label="Like"
					>
						<PiCaretLeft />
					</Button>
				)}
			</Navbar>
			<div className="grid mt-20 place-items-center p-4">
				<div className="max-w-md w-full">{children}</div>
			</div>
		</main>
	);
}
