import React from "react";
import { getPosts } from "./infra/api";
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import ListItemText from '@mui/material/ListItemText';


function Posts({posts, setPosts}){
  // const [posts, setPosts]=useState([]);
  const getAPIData = async () => {
    try {
      const res = await getPosts();
      const postData = res.data.data;
      setPosts(postData);
    }catch(error){
      console.error('Error fetching data:', error);
    }
  };
  useEffect(()=>{
    getAPIData();
  }, []);

  return (
    <div>
      <h1>Posts Title</h1>
      <ul className="z-0">
        {posts.map((post) => (
          <li
            className=""
            key={post.id}
            disableGutters
          >
            <ListItemText primary={post.title} />
            <button>
              <Link to={`/posts/${post.id}`}>詳細</Link>
            </button>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default Posts;