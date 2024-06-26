import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import PostCreateModal from './PostCreateModal';
import Posts from '../Posts';
import { deletePost } from "../infra/api";
import { useNavigate } from "react-router-dom";

function Header({ posts, setPosts, getAPIData }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [message, setMessage] = useState('');

  const toggleDrawer = (newOpen) => () => {
    setDrawerOpen(newOpen);
  };

  const handleDelete = async (id) => {
    if (window.confirm("削除しますか？")) {
      try {
        await deletePost(id);
        getAPIData();
        navigate(`/`);
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const displayMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="bg-gray-800">
        <Toolbar variant="dense" className="bg-gray-800 text-white">
          <div className="sm:hidden">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </div>
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
          <PostCreateModal show={show} setShow={setShow} setPosts={setPosts} displayMessage={displayMessage}/>
        </Toolbar>
      </AppBar>
      {message && <div className="fixed top-16 left-0 w-full bg-orange-800 text-white text-center py-2">{message}</div>}
      {/* {message && <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white text-center py-2 px-4 rounded">{message}</div>} */}
      <Posts
        posts={posts}
        setPosts={setPosts}
        open={drawerOpen}
        toggleDrawer={toggleDrawer}
        handleDelete={handleDelete}
      />
    </Box>
  );
}

export default Header;
