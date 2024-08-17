// src/hooks/useTodoList.ts
import { useState } from 'react';

// Define types for Todo item
export interface TodoItem {
    id: number;
    text: string;
    completed: boolean;
}

// Define hook for managing todos
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

    // Remove a todo by id
    const removeTodo = (id: number) => {
        setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
    };

    // Toggle completion status of a todo
    const toggleTodo = (id: number) => {
        setTodos((prevTodos) =>
            prevTodos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    // Update an existing todo
    const updateTodo = (id: number, newText: string) => {
        setTodos((prevTodos) =>
            prevTodos.map(todo =>
                todo.id === id ? { ...todo, text: newText } : todo
            )
        );
    };

    // Clear all todos
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
