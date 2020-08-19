import React, { useState, useContext } from 'react';
import { TodosContext } from '../contexts/TodosContext';

export default function TodoForm() {
    const [todo, setTodo] = useState('');
    const { addTodo } = useContext(TodosContext);
    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo(todo);
        setTodo('');
    };
    return (
        <form class="form my-6" onSubmit={handleSubmit}>
            <div class="flex flex-col text-sm">
                <label htmlFor="todo" className="font-bold mb-2 text-gray-800 ">
                    Todo
                </label>
                <input
                    type="text"
                    name="todo"
                    value={todo}
                    placeholder="ex. Learn about authentication in Next.js"
                    class=" appearance-none border border-gray-200 p-2 focus:outline-none focus:border-gray-500 rounded-lg "
                    onChange={(e) => setTodo(e.target.value)}
                />
            </div>
            <div class="submit">
                <button
                    type="submit"
                    class=" w-full bg-blue-600 shadow-lg text-white px-4 py-2 hover:bg-blue-700 my-3 text-center font-semibold focus:outline-none rounded-lg"
                >
                    Submit
                </button>
            </div>
        </form>
    );
}
