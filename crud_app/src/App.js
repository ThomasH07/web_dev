import React, { useEffect, useState } from 'react';
import { db } from './firebase.js';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const todosRef = collection(db, 'todos');

  // READ
  const fetchTodos = async () => {
    try {
      const snapshot = await getDocs(todosRef);
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTodos(items);
    } catch (error) {
      console.error('Error fetching todos:', error.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // CREATE
  const addTodo = async () => {
    const trimmed = newTodo.trim();
    if (!trimmed) return;

    try {
      await addDoc(todosRef, { text: trimmed, completed: false });
      setNewTodo('');
      fetchTodos();
    } catch (error) {
      console.error('Error adding todo:', error.message);
    }
  };

  // UPDATE
  const toggleComplete = async (id, completed) => {
    try {
      const todoDoc = doc(db, 'todos', id);
      await updateDoc(todoDoc, { completed: !completed });
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo:', error.message);
    }
  };

  // DELETE
  const deleteTodo = async (id) => {
    try {
      const todoDoc = doc(db, 'todos', id);
      await deleteDoc(todoDoc);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error.message);
    }
  };

  return (
    <div className="Container">
      <h1 className="title">To-Do List</h1>

      <div className="Container-input">
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="New to-do"
        />
        <button onClick={addTodo}>
          Add
        </button>
      </div>
      <div className = "Container-todolist">
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              <span
                onClick={() => toggleComplete(todo.id, todo.completed)}
                className={`cursor-pointer ${todo.completed ? 'line-through' : ''}`}
              >

                {todo.text}
              </span>
              <button className = "deletebutton"
                onClick={() => deleteTodo(todo.id)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
