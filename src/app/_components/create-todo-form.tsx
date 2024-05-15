'use client';

import { createTodo } from '@/actions/todo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAction } from 'next-safe-action/hooks';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from '@/schemas/todo';
import { toast } from 'sonner';
import { useEffect } from 'react';

const CreateTodoForm = () => {
	const { execute, result, status } = useAction(createTodo);
	const {
		register,
		handleSubmit,
		reset,
		setFocus,
		formState: { errors },
	} = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
	});

	useEffect(() => {
		if (status === 'hasSucceeded') {
			toast.success('Todo created!');
			setFocus('title');
			reset();
		}
	}, [status, reset, setFocus]);

	return (
		<>
			<form
				onSubmit={handleSubmit(data => {
					execute(data);
				})}
				className='space-y-4'
			>
				<Input placeholder='Create a new todo...' {...register('title')} />
				{errors.title && <p className='text-red-500'>{errors.title.message}</p>}
				<Input placeholder='Description...' {...register('description')} />
				{errors.description && (
					<p className='text-red-500'>{errors.description.message}</p>
				)}
				<Button>Create</Button>
			</form>
		</>
	);
};
export default CreateTodoForm;
