'use client';

import { createTodo } from '@/actions/todo/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useOptimisticAction } from 'next-safe-action/hooks';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Todo } from '@prisma/client';
import DeleteTodoButton from './delete-todo-button';
import { createTodoSchema } from '@/actions/todo/schemas';

type Props = {
	todos: Todo[];
};

const CreateTodoForm = ({ todos }: Props) => {
	const { execute, optimisticData, status } = useOptimisticAction(
		createTodo,
		todos,
		(state, newTodo) => [...state, newTodo],
		{
			onSuccess: () => {
				toast.success('Todo created');
				setFocus('title');
				reset();
			},
		}
	);
	const {
		register,
		handleSubmit,
		reset,
		setFocus,
		formState: { errors },
	} = useForm<z.infer<typeof createTodoSchema>>({
		resolver: zodResolver(createTodoSchema),
	});

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
				<Button disabled={status === 'executing'}>
					{status === 'executing' ? 'Creating...' : 'Create Todo'}
				</Button>
			</form>
			<div className='mt-12 space-y-6 '>
				{optimisticData.map(todo => (
					<div className='flex gap-4 items-center' key={todo.id}>
						{todo.title} <DeleteTodoButton id={todo.id} />
					</div>
				))}
			</div>
		</>
	);
};
export default CreateTodoForm;
