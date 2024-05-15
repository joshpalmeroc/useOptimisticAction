'use client';

import { deleteTodo } from '@/actions/todo';
import { Button } from '@/components/ui/button';
import { useAction } from 'next-safe-action/hooks';
import { useEffect } from 'react';
import { toast } from 'sonner';

const DeleteTodoButton = ({ id }: { id: string }) => {
	const { execute, status, result } = useAction(deleteTodo);
	useEffect(() => {
		if (status === 'hasSucceeded') {
			toast.success('Todo deleted!');
		}
		if (result?.serverError) {
			toast.error(result?.serverError);
		}
	}, [result, status]);
	return (
		<Button
			onClick={async () => {
				await execute({ id });
			}}
		>
			{status === 'executing' ? 'Deleting...' : 'Delete Todo'}
		</Button>
	);
};
export default DeleteTodoButton;
