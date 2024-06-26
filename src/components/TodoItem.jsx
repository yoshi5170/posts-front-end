import React from "react";
import { useState } from "react";
import { deleteTodo } from "../infra/api";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
function TodoItem ({todo, handleCheckboxChange, setTodos}){
  const [error, setError] = useState(null);
  const handleDelete= async(id) => {
    if (window.confirm("削除しますか？")){
      try{
        await deleteTodo(id);
        setTodos((prevTodos) => {
          return prevTodos.filter(t => t.id !== id)
        })
      }catch(error){
        setError(error)
      }
    }
  };


  return(
    <div key={todo.id} className="flex items-center justify-between mb-4 p-4 bg-white shadow-lg rounded-lg border border-gray-200 w-full">
      <div className="flex items-center w-full">
        <div className="flex items-start flex-shrink-0">
          <input
            id={`checkbox-${todo.id}`}
            onChange={() => handleCheckboxChange(todo.id)}
            type="checkbox" checked={todo.completed}
            className="accent-gray-800 w-5 h-5 rounded focus:ring-orange-500 focus:ring-2"
          />
        </div>
        <label
          htmlFor={`checkbox-${todo.id}`}
          className={`ml-4 text-lg font-medium break-words whitespace-normal flex-grow ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}
        >
          {todo.description}
        </label>
        <div className="flex-shrink-0">
          <IconButton aria-label="delete" onClick={() => handleDelete(todo.id)}>
            <DeleteIcon className="text-orange-800"/>
          </IconButton>
        </div>
      </div>
    </div>
  )

}
export default TodoItem;
