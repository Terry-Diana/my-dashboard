import { useState } from 'react';

export interface TodoItem {
    id: number;
    text: string;
    completed: boolean;
}
export const useTodoList = () => {
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Add a new todo
    const addTodo = (text: string) => {
        setTodos((prevTodos) => [
            ...prevTodos,
            { id: Date.now(), text, completed: false },
        ]);
    };

    const removeTodo = (id: number) => {
        setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
    };

    const toggleTodo = (id: number) => {
        setTodos((prevTodos) =>
            prevTodos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const updateTodo = (id: number, newText: string) => {
        setTodos((prevTodos) =>
            prevTodos.map(todo =>
                todo.id === id ? { ...todo, text: newText } : todo
            )
        );
    };

    const clearTodos = () => {
        setTodos([]);
    };

    return {
        todos,
        loading,
        error,
        addTodo,
        removeTodo,
        toggleTodo,
        updateTodo,
        clearTodos,
    };
};
