import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ReactNode } from 'react';
import { NextUIProvider } from '@nextui-org/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Ekonidril',
	description: 'Manage your finances with ease',
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<NextUIProvider>{children}</NextUIProvider>
			</body>
		</html>
	);
}
