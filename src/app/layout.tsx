import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ReactNode } from 'react';
import { Providers } from '@/app/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Ekonidril',
	description: 'Manage your finances with ease',
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" className="dark">
			<body className={inter.className}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
