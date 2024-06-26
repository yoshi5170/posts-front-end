import { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import { getPost, postTodo, updateTodo } from "./infra/api";
import TodoFrom from "./components/TodoFrom";
import TodoItem from "./components/TodoItem";
import PostEditModal from  "./components/PostEditModal";

function Post({ setPosts }){
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [show, setShow] = useState(false)
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  console.log(`id: ${id}, type: ${typeof id}`);

  const displayMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  useEffect(() => {
    const getAPIData = async () => {
      try {
        const res = await getPost(id);
        const postData = res.data.data.post;
        const todosData = res.data.data.todos;
        setPost(postData);
        setTodos(todosData);
        setLoading(false);
      } catch (error) {
        setError(error);
        console.error('Error fetching post data:', error);
        setLoading(false);
      }
    };
    getAPIData();
  }, [id]);

  const handleChange = (evt) => {
    setText(evt.target.value)
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError(null);

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
      console.error('todoの追加:', error);;
      setError("An unexpected error occurred.");
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

  const handleUpdateTitle = (newTitle) => {
    setPost(prevPost => ({
      ...prevPost, title: newTitle
    }));
    setPosts(prevPosts => prevPosts.map(post => post.id === Number(id) ? { ...post, title: newTitle } : post));
  };

  if (!post) return <div className="container sm:ml-64">Loading...</div>;

  return (
    <div className="container sm:ml-64">
      {message && <div className="fixed top-16 left-0 w-full bg-orange-800 text-white text-center py-2">{message}</div>}
      <div className="mx-2 mt-6 p-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <h2 className="font-bold text-lg text-gray-600">ToDoリスト詳細</h2>
            <div className="flex items-end w-full sm:w-1/2 border-b-2 border-gray-200 mb-4">
              <p className="flex-grow italic mt-4">タイトル：{post.title}</p>
              <button onClick={() => setShow(true)} className="text-gray-500">編集</button>
              <PostEditModal show={show} setShow={setShow} handleUpdateTitle={handleUpdateTitle} displayMessage={displayMessage}/>
            </div>
            <div className="w-full sm:w-1/2 p-2">
              {todos.length === 0 ? (
                <p className="text-sm text-gray-400">まだToDoは作成されていません。</p>
              ): (
                <div className="bg-orange-800 bg-opacity-80 rounded-md py-2">
                  {todos.map((todo) => (
                    <TodoItem todo={todo} handleCheckboxChange={handleCheckboxChange} setTodos={setTodos}/>
                  ))}
                </div>
              )}
            </div>
            <div className=" w-full sm:w-1/2 flex items-center mt-8 p-2">
              <TodoFrom text={text} handleChange={handleChange} handleSubmit={handleSubmit}/>
            </div>
          </>
        )}
      </div>
    </div>
  )

};
export default Post;