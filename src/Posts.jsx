import React from "react";
import { getPosts, deletePost } from "./infra/api";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


function Posts({posts, setPosts}){
  // const [posts, setPosts]=useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
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

  const handleDelete = async (id) => {
    if (window.confirm("削除しますか？")) {
      try {
        await deletePost(id);
        navigate("/");
      } catch (error) {
        setError(error);
      }
    }
  };

  return (
    <aside class="fixed top-14 left-0 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 border-r-2 border-gray-200" >
      <div class="h-full px-3 py-4 overflow-y-auto">
        <ul className="space-y-2">
          {posts.map((post) => (
            <div key={post.id} className="flex items-end justify-between px-2 pt-2 text-gray-900 hover:bg-gray-100 border-b-2 border-orange-800 border-opacity-50 hover:bg-gray-200">
              <li className="flex-grow">
                <p onClick={() => navigate(`/posts/${post.id}`)}>{post.title}</p>
              </li>
              <IconButton aria-label="delete" onClick={() => handleDelete(post.id)}>
                <DeleteIcon className="text-orange-800"/>
              </IconButton>
            </div>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default Posts;