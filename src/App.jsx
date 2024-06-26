import './App.css';
import axios from 'axios';
import PostCreate from './PostCreate';
import Post from './Post';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import { useState, useEffect } from 'react';
import Top from './Top';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

function App() {
  const [posts, setPosts] = useState([]);

  const getAPIData = async () => {
    try {
      const res = await axios.get('/posts');
      const postData = res.data.data;
      setPosts(postData);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    getAPIData();
  }, []);

  return (
    <Router>
      <Header posts={posts} setPosts={setPosts} getAPIData={getAPIData} />
      <Routes>
        <Route path="/" element={<Top posts={posts} />} />
        <Route path="/posts/:id" element={<Post setPosts={setPosts} />} />
      </Routes>
    </Router>
  );
}

export default App;
