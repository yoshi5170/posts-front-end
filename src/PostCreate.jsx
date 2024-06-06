import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {postPost} from "./infra/api";
function PostCreate(){
  const [title, setTitle] = useState('');
  const navigateToPosts = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      title: title,
    }

    await postPostFunc(newPost)

    setTitle('');
  }
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }

  const postPostFunc = async (post) => {
    try {
      await postPost(post)
      navigateToPosts("/")
    }catch (error) {
      console.log(error);
    }
  };


  return (
    <div>
      <h2>Post Create</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title" />
            <input type="text" value={title} onChange={handleTitleChange} id="title" required/>
          </div>
          <button type="submit">作成</button>
        </form>
    </div>
  )
}

export default PostCreate;