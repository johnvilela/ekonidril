import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
}

export function Button({ children, ...props }: ButtonProps) {
	return (
		<button
			className="block bg-blue-500 rounded-md p-2 duration-200 hover:brightness-75"
			{...props}
		>
			{children}
		</button>
	);
}
