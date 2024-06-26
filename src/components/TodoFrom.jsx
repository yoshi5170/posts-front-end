import React from "react";

function TodoFrom ({text, handleChange, handleSubmit}){
  return(
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex w-full">
        <input type="text" value={text}  onChange={handleChange} id="text" className="flex-grow border-b-2 border-gray-200 px-2" placeholder="add a new todo"required/>
        <button type="submit" className="ml-2 px-4 pt-2 hover:bg-gray-200 text-gray-500 border-b-2">作成</button>
      </div>
    </form>
  )

}

export default TodoFrom;