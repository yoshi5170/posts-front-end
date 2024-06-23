import React from 'react';
import { useState } from "react";
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { PostCreateModal } from './PostCreateModal';

function Header ({setPosts}) {
  const [show, setShow] = useState(false)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense" className="bg-zinc-300 text-black">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
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
