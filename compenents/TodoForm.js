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
        <form className="form my-6" onSubmit={handleSubmit}>
            <div className="flex flex-col text-sm mb-2">
                <label htmlFor="todo" className="font-bold mb-2 text-gray-800 ">
                    Todo
                </label>
                <input
                    type="text"
                    name="todo"
                    value={todo}
                    placeholder="ex. Learn about authentication in Next.js"
                    className=" appearance-none border border-gray-200 p-2 focus:outline-none focus:border-gray-500 rounded-lg "
                    onChange={(e) => setTodo(e.target.value)}
                />
            </div>
            <button
                type="submit"
                className=" w-full rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
            >
                Submit
            </button>
        </form>
    );
}
