import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {getPost, updatePost} from "./infra/api";

function PostEdit(){
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPostData = async () => {
    try {
      const response = await getPost(id);
      const postData = response.data.data;
      setTitle(postData.title);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updatedPostData = {
        title
      };
      await updatePost(id, updatedPostData);
      navigate(`/posts/${id}`);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  return(
    <div>
      <h2>投稿編集</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
        </form>
      )}
    </div>
  );
};
export default PostEdit;