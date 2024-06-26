import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import {postPost} from "../infra/api";
function PostCreateModal ({show, setShow, setPosts}) {
  const[title, setTitle] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      title: title,
    };
    // const newPost = { title }; <=上記と同じ意味
    await postPostFunc(newPost)
  }

  const postPostFunc = async (post) => {
    try {
      const res = await postPost(post)
      if (res.data.status === "ERROR") {
        const errorMessage = res.data.data.title ? res.data.data.title[0] : "An unexpected error occurred.";
        setError(errorMessage);
      } else {
        const newPost = res.data.data;
        setShow(false);
        setTitle('');
        setError(null);
        navigate("/");
        addPost(newPost);
      }
    } catch (error) {
      console.error(error);
      setError("An unexpected error occurred.");
    }
  };

  const addPost = (newPost) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }

  if(show) {
    return(
      <div className="fixed top-0 left-0 w-full h-full bg-slate-900 bg-opacity-75 z-10">
        <div className="mx-auto mt-60 p-2 w-2/3 lg:w-1/3 z-20 bg-white text-center rounded-lg">
          <p className="text-left px-2 font-bold text-gray-600">リストを作成</p>
          <form className="mt-2" onSubmit={handleSubmit}>
            <div className="flex space-y-4 flex-col text-left my-4 px-2 text-black w-full">
              <label htmlFor="title" className="font-light text-gray-500 text-sm">リスト名</label>
              <input
              className="w-full border-b-2 border-gray-400 text-sm pl-2"
              type="text"
              value={title}
              onChange={handleTitleChange}
              id="title"
              placeholder="create a new list"
              required
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
            <div className="flex justify-end mx-2 space-x-2">
              <div>
                <button className="rounded text-gray-600 hover:bg-gray-300 p-2 text-sm" type="submit">作成</button>
              </div>
              <div>
                <button className="rounded text-gray-600 hover:bg-gray-300 p-2 text-sm" onClick={()=> setShow(false)}>キャンセル</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }else{
    return null;
  }
};

export default PostCreateModal;