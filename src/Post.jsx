import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, postTodo, updateTodo } from "./infra/api";
import TodoFrom from "./components/TodoFrom";
import TodoItem from "./components/TodoItem";

function Post(){
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAPIData = async () => {
      try {
        // console.log('Fetching post data for ID:', id);
        const res = await getPost(id);
        const postData = res.data.data.post;
        const todosData = res.data.data.todos;
        setPost(postData);
        setTodos(todosData);
        // setLoading(false);
      } catch (error) {
        setError(error);
        console.error('Error fetching post data:', error);
        // setLoading(false);
      }
    };
    getAPIData();
  }, [id]);

  if (!post) return <div>Loading...</div>;

  const handleChange = (evt) => {
    setText(evt.target.value)
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    const newTodo = {
      description: text,
    }

    await postTodoFunc(id, newTodo)
    setText("");
  }

  const postTodoFunc = async (postId, todo) => {
    try {
      const res = await postTodo(postId, todo);
      setTodos([...todos, res.data.data]);
    }catch (error) {
      console.log(error);
    }
  };

  const handleCheckboxChange = async (todoId) => {
    const updatedTodos = todos.map(todo =>
      todo.id === todoId ? {...todo, completed: !todo.completed} :todo
    );
    setTodos(updatedTodos);
    const todoToUpdate = updatedTodos.find(todo => todo.id === todoId);

    try {
      await updateTodo(todoToUpdate.id, { completed: todoToUpdate.completed });
    }catch (error){
      console.error('Error updating todo:', error);
      setTodos(todos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      ));
    }
  };


  return (
    <div className="container ml-64">
      <div className="mx-2 mt-6 p-4">
        <h2 className="font-bold text-lg text-gray-600">ToDoリスト詳細</h2>
        <div className="flex items-end w-1/2 border-b-2 border-gray-200 mb-4">
          <p className="flex-grow italic mt-4">タイトル：{post.title}</p>
          <button onClick={()=> navigate(`/posts/${id}/edit`)} className="text-gray-500">編集</button>
        </div>
        <div className="w-1/2 p-2 bg-orange-800 bg-opacity-80 rounded-md">
          {todos.map((todo) => (
            <TodoItem todo={todo} handleCheckboxChange={handleCheckboxChange} setTodos={setTodos}/>
          ))}
        </div>
        <div className="w-1/2 flex items-center mt-8 p-2">
          <TodoFrom text={text} handleChange={handleChange} handleSubmit={handleSubmit}/>
        </div>
      </div>
    </div>
  )

};
export default Post;