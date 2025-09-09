import { useEffect, useState } from "react";
import { NewTodoForm } from "./NewTodoForm";
import "./styles.css";
import { TodoList } from "./TodoList";

export default function App() {
  const [todos, setTodos] = useState(() =>{
    try {
      const localValue = localStorage.getItem("ITEMS")
      return localValue == null ? [] : JSON.parse(localValue)
    }catch (err) {
      console.error('Faile to load todos from localStorage', err)
      return []
    }
  })

  /*localStorage.setItem("ITEMS", ...) creates (or overwrites) the key "ITEMS".

The value stored is always a string, so we do JSON.stringify(todos). */

  useEffect(()=> {
    try {
      localStorage.setItem("ITEMS", JSON.stringify(todos))
    } catch (err) {
      console.error("Failed to save todos to localStorage", err)
    }
  }, [todos])

  function addTodo(title){
    setTodos(currentTodos => {
      return [
        ...currentTodos,
        {id: crypto.randomUUID(), title, completed: false},
      ]
    }) 
  }

  function toggleTodo(id, completed){
    setTodos(currentTodos =>{
      return currentTodos.map(todo =>{
        if(todo.id === id){
          return {...todo, completed}
        }
        return todo;
      })
    })
  }

  function deleteTodo(id){
    setTodos(currentTodos =>{
      return currentTodos.filter(todo => todo.id !== id)
    })
  }
  return (
    <>
      <NewTodoForm onSubmit={addTodo}/>
      <h1 className="header">Todo List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>

    </>
  );
}