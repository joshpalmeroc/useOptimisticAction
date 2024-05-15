import prisma from '@/lib/db';
import CreateTodoForm from './_components/create-todo-form';
import DeleteTodoButton from './_components/delete-todo-button';

const HomePage = async () => {
	const todos = await prisma.todo.findMany();
	return (
		<div className='container mx-auto py-24'>
			<h1 className='font-extrabold text-4xl mb-8'>Todos</h1>
			<CreateTodoForm />
			<div className='mt-12'>
				{todos.map(todo => (
					<p key={todo.id}>
						{todo.title} <DeleteTodoButton id={todo.id} />
					</p>
				))}
			</div>
		</div>
	);
};
export default HomePage;
