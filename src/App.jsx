import './App.css';
import axios from 'axios';
import Posts from './Posts';
import PostCreate from './PostCreate';
import Post from './Post';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import { useState } from 'react';
import Top from './Top';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;


function App() {
  const [posts, setPosts] = useState([]);

  return (
    <Router>
      <Header posts={posts} setPosts={setPosts}/>
      <Posts posts={posts} setPosts={setPosts}/>
      <Routes>
      <Route path="/" element={<Top posts={posts} />} />
        <Route
          path="/posts/create"
          element={<PostCreate/>}
        />
        <Route
          path="/posts/:id"
          element={<Post setPosts={setPosts}/>}
        />
      </Routes>
    </Router>
  );
}

export default App;
