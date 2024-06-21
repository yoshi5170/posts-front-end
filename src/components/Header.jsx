// src/components/Header.jsx
import React from 'react';
import { useState } from "react";
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import { PostCreateModal } from './PostCreateModal';

export function Header ({setPosts}) {
  const [show, setShow] = useState(false)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/">TODOList</Link>
          </Typography>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="add"
            onClick={() => setShow(true)}
          >
            <AddIcon />
          </IconButton>
          <PostCreateModal show={show} setShow={setShow} setPosts={setPosts}/>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
