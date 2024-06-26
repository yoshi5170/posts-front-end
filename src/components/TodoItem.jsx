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
    <div key={todo.id} className="flex items-end justify-between text-white mb-4 px-2 hover:border-b-2  hover:border-orange-800 w-full">
      <div className="flex items-center w-full">
        <div className="flex items-start flex-shrink-0">
          <input id={`checkbox-${todo.id}`} onChange={() => handleCheckboxChange(todo.id)} type="checkbox" checked={todo.completed} className="accent-gray-600 w-4 h-4 bg-gray-100 border-gray-300 rounded focus:ring-gray-500 focus:ring-2"/>
        </div>
        <label htmlFor={`checkbox-${todo.id}`} className="ml-2 text-sm font-medium break-words whitespace-normal flex-grow">{todo.description}</label>
        <div className="flex-shrink-0">
          <IconButton aria-label="delete" onClick={() => handleDelete(todo.id)}>
            <DeleteIcon className="text-white"/>
          </IconButton>
        </div>
      </div>
    </div>
  )

}
export default TodoItem;
