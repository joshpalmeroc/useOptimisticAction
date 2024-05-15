import { z } from 'zod';

export const schema = z.object({
	title: z.string().min(1),
	description: z.string().min(1),
});

export const deletoTodoSchema = z.object({
	id: z.string().min(1),
});
