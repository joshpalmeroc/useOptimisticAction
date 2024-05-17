import { z } from 'zod';

export const createTodoSchema = z.object({
	title: z.string().min(1),
});

export const deleteTodoSchema = z.object({
	id: z.string().min(1),
});
