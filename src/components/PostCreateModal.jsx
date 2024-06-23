import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import {postPost} from "../infra/api";
export function PostCreateModal ({show, setShow, setPosts}) {
  const[title, setTitle] = useState('');
  const navigateToPosts = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      title: title,
    };
    // const newPost = { title }; <=上記と同じ意味
    await postPostFunc(newPost)
    setTitle('');
  }


  const postPostFunc = async (post) => {
    try {
      const res = await postPost(post)
      const newPost = res.data.data;
      setShow(false)
      navigateToPosts("/")
      addPost(newPost);

    }catch (error) {
      console.log(error);
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
        <div className="mx-auto mt-60 p-2 w-1/4 z-20 bg-white text-black text-center rounded-lg">
          <p className="text-left px-2 font-bold">リストを作成</p>
          <form className="mt-2" onSubmit={handleSubmit}>
            <div className="flex flex-col text-left my-4 px-2 text-black w-1/2">
              <label htmlFor="title" className="font-light text-xs">タイトル</label>
              <input className="border-2 rounded-lg border-gray-200" type="text" value={title} onChange={handleTitleChange} id="title" required/>
            </div>
            <div className="flex justify-end mx-2 space-x-2">
              <div>
                <button className="rounded-lg hover:bg-gray-300 px-2 text-sm" type="submit">作成</button>
              </div>
              <div>
                <button className="rounded-lg hover:bg-gray-300 px-2 text-sm" onClick={()=> setShow(false)}>キャンセル</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }else{
    return null;
  }
}