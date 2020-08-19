import { createContext, useState } from 'react';

const TodosContext = createContext();

const TodosProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);

    const refreshTodos = async () => {
        try {
            const res = await fetch('/api/getTodos');
            const latestTodos = await res.json();
            setTodos(latestTodos);
        } catch (err) {
            console.error(err);
        }
    };

    const addTodo = async (todo) => {
        try {
            const res = await fetch('/api/createTodo', {
                method: 'POST',
                body: JSON.stringify({ description: todo }),
                headers: { 'Content-Type': 'application/json' },
            });
            const newTodo = await res.json();
            setTodos((prevTodos) => {
                const updatedTodos = [newTodo, ...prevTodos];
                return updatedTodos;
            });
        } catch (err) {
            console.error(err);
        }
    };

    const updateTodo = (updatedTodo) => {
        setTodos((prevTodos) => {
            const existingTodos = [...prevTodos];
            const existingTodo = existingTodos.find(
                (todo) => todo.id === updatedTodo.id
            );
            existingTodo.fields = updatedTodo.fields;
            return existingTodos;
        });
    };

    const deleteTodo = (id) => {
        setTodos((prevTodos) => {
            return prevTodos.filter((todo) => todo.id !== id);
        });
    };

    return (
        <TodosContext.Provider
            value={{
                todos,
                setTodos,
                refreshTodos,
                updateTodo,
                deleteTodo,
                addTodo,
            }}
        >
            {children}
        </TodosContext.Provider>
    );
};

export { TodosProvider, TodosContext };
