import './App.css';
import axios from 'axios';
import Posts from './Posts';
import PostCreate from './PostCreate';
import PostEdit from './PostEdit';
import Post from './Post';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import { useState } from 'react';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;


// const API_URL = "http://localhost:3000/api/v1/posts";

function App() {
  const [posts, setPosts] = useState([]);

  return (
    <Router>
      <Header posts={posts} setPosts={setPosts}/>
      <Posts posts={posts} setPosts={setPosts}/>
      <Routes>
        <Route path="/" element={<Posts posts={posts} setPosts={setPosts}/>} />
        <Route
          path="/posts/create"
          element={<PostCreate/>}
        />
        <Route
          path="/posts/:id"
          element={<Post />}
        />
        <Route
          path="/posts/:id/edit"
          element={<PostEdit/>}
        />
      </Routes>
    </Router>
  );
}

export default App;
