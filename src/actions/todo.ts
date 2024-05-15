'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { action } from '@/lib/safe-action';
import { deletoTodoSchema, schema } from '@/schemas/todo';

async function sleep(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export const createTodo = action(schema, async ({ title, description }) => {
	const todo = await prisma.todo.create({
		data: { title, description },
	});
	revalidatePath('/');
	return todo;
});

export const deleteTodo = action(deletoTodoSchema, async ({ id }) => {
	await sleep(100);
	await prisma.todo.delete({ where: { id } });
	revalidatePath('/');
});
