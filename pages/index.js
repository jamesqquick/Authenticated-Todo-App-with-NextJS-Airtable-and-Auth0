import Head from 'next/head';
import { table, minifyRecords } from './api/utils/airtable';
import Todo from '../compenents/Todo';
import { useEffect, useContext } from 'react';
import { TodosContext } from '../contexts/TodosContext';
import TodoForm from '../compenents/TodoForm';
import auth0 from '../utils/auth0';

export default function Home({ initialTodos, user }) {
    const { todos, setTodos, refreshTodos } = useContext(TodosContext);
    useEffect(() => {
        setTodos(initialTodos);
    }, []);

    return (
        <div>
            <Head>
                <title>My Todo CRUD App</title>
            </Head>

            <main>
                <nav>
                    <div class="md:flex items-center justify-between py-2 px-8 md:px-12">
                        <div class="flex justify-between items-center">
                            <div class="text-2xl font-bold text-gray-800 md:text-3xl">
                                <a href="#">My Todos</a>
                            </div>
                        </div>
                        <div class="flex">
                            {user ? (
                                <a
                                    href="/api/logout"
                                    class="text-gray-800 rounded hover:bg-gray-900 hover:text-gray-100 hover:font-medium py-2 px-2 md:mx-2"
                                >
                                    Logout
                                </a>
                            ) : (
                                <a
                                    href="/api/login"
                                    class="text-gray-800 rounded hover:bg-gray-900 hover:text-gray-100 hover:font-medium py-2 px-2 md:mx-2"
                                >
                                    Login
                                </a>
                            )}
                        </div>
                    </div>
                </nav>
                {!user && (
                    <p className="text-center mt-4">
                        Please login to save todos!
                    </p>
                )}

                {user && (
                    <>
                        <TodoForm />
                        <ul>
                            {todos &&
                                todos.map((todo) => (
                                    <Todo todo={todo} key={todo.id} />
                                ))}
                        </ul>
                    </>
                )}
            </main>
        </div>
    );
}

export async function getServerSideProps(context) {
    const session = await auth0.getSession(context.req);
    let todos = [];
    if (session?.user) {
        todos = await table
            .select({ filterByFormula: `userId = '${session.user.sub}'` })
            .firstPage();
    }
    return {
        props: {
            initialTodos: minifyRecords(todos),
            user: session?.user || null,
        },
    };
}
