'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { action } from '@/lib/safe-action';
import { createTodoSchema, deleteTodoSchema } from './schemas';

async function sleep(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export const createTodo = action(createTodoSchema, async ({ title }) => {
	await sleep(1000);
	const todo = await prisma.todo.create({
		data: { title },
	});
	revalidatePath('/');
	return todo;
});

export const deleteTodo = action(deleteTodoSchema, async ({ id }) => {
	await sleep(100);
	await prisma.todo.delete({ where: { id } });
	revalidatePath('/');
});
