'use client';
import { Button, ButtonProps } from '@nextui-org/button';
import { useFormStatus } from 'react-dom';

export function SubmitButton({ ...rest }: ButtonProps) {
	const { pending } = useFormStatus();

	return <Button type="submit" isLoading={pending} {...rest} />;
}
