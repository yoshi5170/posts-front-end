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
      <div className="fixed top-0 left-0 w-full h-full bg-slate-400 opacity-75">
        <div className="mx-auto mt-60 py-2 w-1/2 z-10 bg-white text-black text-center">
          <p>新規作成</p>
          <form className="my-2" onSubmit={handleSubmit}>
            <div className="my-4">
              <label htmlFor="title" />
              <input className="border-2 rounded-lg border-cyan-100" type="text" value={title} onChange={handleTitleChange} id="title" required/>
            </div>
            <button className="border-2 border-cyan-200 rounded-lg px-2" type="submit">作成</button>
          </form>
          <button className="border-2 border-cyan-500 rounded-lg px-2" onClick={()=> setShow(false)}>close</button>
        </div>
      </div>
    )
  }else{
    return null;
  }
}