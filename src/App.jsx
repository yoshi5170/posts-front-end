import './App.css';
import axios from 'axios';
import Posts from './Posts';
import PostCreate from './PostCreate';
import PostEdit from './PostEdit';
import Post from './Post';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;


// const API_URL = "http://localhost:3000/api/v1/posts";

function App() {
  // const [posts, setPosts]=useState([]);
  // const getAPIData = async () => {
  //   try {
  //     const res = await axios.get(API_URL)
  //     const postData = res.data.data
  //     setPosts(postData);
  //   }catch(error){
  //     console.error('Error fetching data:', error);
  //   }
  // };
  // useEffect(()=>{
  //   getAPIData();
  // }, []);


  return (
    <Router>
      <Box sx={{ flexGrow: 1}}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              ブログ
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route
          path="/posts/create"
          element={<PostCreate/>}
        />
        <Route
          path="/posts/:id"
          element={<Post />}
        />
        <Route
          path="/post/:id/edit"
          element={<PostEdit/>}
        />
      </Routes>
    </Router>
  );
}

export default App;
