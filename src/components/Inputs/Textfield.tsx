import { InputHTMLAttributes } from 'react';

export type TextfieldProps = InputHTMLAttributes<HTMLInputElement>;

export function Textfield({ ...props }: TextfieldProps) {
	return (
		<input className="block border border-gray-300 rounded-md p-2" {...props} />
	);
}
