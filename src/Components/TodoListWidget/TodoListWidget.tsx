import React, { useState, ChangeEvent, FormEvent } from 'react';
import { TodoItem, useTodoList } from '../../Hooks/useTodoList';
import './TodoListWidget.css';

interface TodoListWidgetProps {
    todos: TodoItem[];
    loading: boolean;
    error: string | null;
    addTodo: (text: string) => void;
    removeTodo: (id: number) => void;
    toggleTodo: (id: number) => void;
    updateTodo: (id: number, newText: string) => void;
    clearTodos: () => void;
    className?: string;
}

const TodoListWidget: React.FC<TodoListWidgetProps> = ({
    todos,
    loading,
    error,
    addTodo,
    removeTodo,
    toggleTodo,
    updateTodo,
    clearTodos,
    className, 
}) => {
    const [newTodoText, setNewTodoText] = useState<string>('');
    const [editTodoId, setEditTodoId] = useState<number | null>(null);
    const [editTodoText, setEditTodoText] = useState<string>('');

    const handleAddTodo = (e: FormEvent) => {
        e.preventDefault();
        if (newTodoText.trim()) {
            addTodo(newTodoText.trim());
            setNewTodoText('');
        }
    };

    const handleEditTodo = (id: number) => {
        const todo = todos.find(todo => todo.id === id);
        if (todo) {
            setEditTodoId(id);
            setEditTodoText(todo.text);
        }
    };

    const handleUpdateTodo = (e: FormEvent) => {
        e.preventDefault();
        if (editTodoText.trim() && editTodoId !== null) {
            updateTodo(editTodoId, editTodoText.trim());
            setEditTodoId(null);
            setEditTodoText('');
        }
    };

    const handleCancelEdit = () => {
        setEditTodoId(null);
        setEditTodoText('');
    };

    return (
        <div className={`todo-list-widget ${className}`}>
            <h2>Todo List</h2>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <form onSubmit={handleAddTodo}>
                <input
                    type="text"
                    value={newTodoText}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNewTodoText(e.target.value)}
                    placeholder="Add a new task"
                />
                <button type="submit">Add</button>
            </form>
            {editTodoId !== null && (
                <form onSubmit={handleUpdateTodo}>
                    <input
                        type="text"
                        value={editTodoText}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEditTodoText(e.target.value)}
                        placeholder="Update task"
                    />
                    <button type="submit">Update</button>
                    <button type="button" onClick={handleCancelEdit}>Cancel</button>
                </form>
            )}
            <ul>
                {todos.map(todo => (
                    <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                        <span>{todo.text}</span>
                        <button onClick={() => toggleTodo(todo.id)}>
                            {todo.completed ? 'Undo' : 'Complete'}
                        </button>
                        <button onClick={() => handleEditTodo(todo.id)}>Edit</button>
                        <button onClick={() => removeTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <button onClick={clearTodos}>Clear All</button>
        </div>
    );
};

export default TodoListWidget;
