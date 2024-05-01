import React from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

function Posts(){
  const navigate = useNavigate();
  const [posts, setPosts]=useState([]);
  const API_URL = "http://localhost:3000/api/v1/posts";
  const getAPIData = async () => {
    try {
      const res = await axios.get(API_URL)
      const postData = res.data.data
      setPosts(postData);
    }catch(error){
      console.error('Error fetching data:', error);
    }
  };
  useEffect(()=>{
    getAPIData();
  }, []);
  const handleDelete = async (id) =>{
    try {
      const response = await axios({
        method: "delete",
        url: `/posts/${id}`,
      });
      console.log(response)
      if (response.status === 200) {
        setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
      }
    }catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  return (
    <Box component="section" sx={{ m: 10, p: 10, border: '1px dashed grey', textAlign:'center' }}>
      <h1>Posts Title</h1>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {posts.map((post) => (
          <ListItem
            sx={{textAlign:'center'}}
            key={post.id}
            disableGutters
            secondaryAction={
              <IconButton aria-label="delete" onClick={() => handleDelete(post.id)}>
                <DeleteIcon />
              </IconButton>
              }
          >
            <ListItemText primary={post.title} />
          </ListItem>
        ))}
      </List>
      {/* {posts.map((post)=>{
        return (
          <div key={post.id}>
            <p style={{display: 'inline'}}>
              {post.title}
            </p>
            <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleDelete(post.id)}>
              削除
            </Button>
          </div>
        );
      })} */}
      <Button variant="outlined" onClick={() => navigate(`/posts/create`)}>投稿作成</Button>
      {/* <button onClick={() => navigate(`/posts/create`)}>投稿作成</button> */}
    </Box>
  );
}

export default Posts;