import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { getPosts} from "./infra/api";

function Posts({ posts, setPosts, open, toggleDrawer, handleDelete }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getAPIData = async () => {
    try {
      const res = await getPosts();
      const postData = res.data.data;
      setPosts(postData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError("An unexpected error occurred.");
      setLoading(false);
    }
  };

  useEffect(() => {
    getAPIData();
  }, []);

  const DrawerList = (
    <Box sx={{ width: 250, height: '100%', backgroundColor: '#e5e7eb', borderRight: '2px solid #cbd5e0' }} role="presentation" onClick={toggleDrawer(false)}>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : posts.length === 0 ? (
        <p className="m-2 text-sm text-gray-500">現在、ToDoはありません。右上の+ボタンから新しいToDoを追加できます。</p>
      ) : (
        <List>
          {posts.map((post) => (
            <ListItem key={post.id} disablePadding>
              <ListItemButton onClick={() => navigate(`/posts/${post.id}`)}>
                <ListItemText primary={post.title} />
                <IconButton
                  aria-label="delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(post.id);
                  }}
                >
                  <DeleteIcon className="text-orange-800"/>
                </IconButton>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );

  return (
    <>
      <aside className="fixed top-14 left-0 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 border-r-2 border-gray-400 bg-gray-200">
        <div className="h-full px-3 py-4 overflow-y-auto">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : posts.length === 0 ? (
            <p className="text-sm text-gray-500">現在、ToDoはありません。右上の+ボタンから新しいToDoを追加できます。</p>
          ) : (
            <ul className="space-y-2">
              {posts.map((post) => (
                <div key={post.id} className="flex items-end justify-between px-2 pt-2 text-gray-900 hover:bg-gray-300 border-b-2 border-orange-800">
                  <li className="flex-grow">
                    <p onClick={() => navigate(`/posts/${post.id}`)}>{post.title}</p>
                  </li>
                  <IconButton aria-label="delete" onClick={() => handleDelete(post.id)}>
                    <DeleteIcon className="text-orange-800" />
                  </IconButton>
                </div>
              ))}
            </ul>
          )}
        </div>
      </aside>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </>
  );
}

export default Posts;
