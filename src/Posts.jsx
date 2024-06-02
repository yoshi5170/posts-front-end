import React from "react";
import axios from 'axios';
import { getPosts } from "./infra/api";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';

function Posts(){
  const navigate = useNavigate();
  const [posts, setPosts]=useState([]);
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
  // const handleDelete = async (id) =>{
  //   try {
  //     const response = await axios({
  //       method: "delete",
  //       url: `/posts/${id}`,
  //     });
  //     console.log(response)
  //     if (response.status === 200) {
  //       setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
  //     }
  //   }catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // }
  return (
    <Box component="section" sx={{ m: 10, p: 10, border: '1px dashed grey', textAlign:'center' }}>
      <h1>Posts Title</h1>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {posts.map((post) => (
          <ListItem
            sx={{textAlign:'center'}}
            key={post.id}
            disableGutters
            // secondaryAction={
            //   <IconButton aria-label="delete" onClick={() => handleDelete(post.id)}>
            //     <DeleteIcon />
            //   </IconButton>
            //   }
          >
            <ListItemText primary={post.title} />
            <button>
              <Link to={`/posts/${post.id}`}>詳細</Link>
            </button>
          </ListItem>
        ))}
      </List>

      <Button variant="outlined" onClick={() => navigate(`/posts/create`)}>投稿作成</Button>
    </Box>
  );
}

export default Posts;