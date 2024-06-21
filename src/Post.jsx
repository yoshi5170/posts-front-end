import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, deletePost } from "./infra/api";
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
function Post(){
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    if (window.confirm("削除しますか？")) {
      try {
        await deletePost(id);
        navigate("/");
      } catch (error) {
        setError(error);
      }
    }
  };

  useEffect(() => {
    const getAPIData = async () => {
      try {
        // console.log('Fetching post data for ID:', id);
        const res = await getPost(id);
        const postData = res.data.data;
        setPost(postData);
        // setLoading(false);
      } catch (error) {
        setError(error);
        console.error('Error fetching post data:', error);
        // setLoading(false);
      }
    };
    getAPIData();
  }, [id]);

  if (!post) return <div>Loading...</div>;



  return (
    <div>
      <h2>投稿詳細</h2>
      <p>{post.title}</p>
      <button onClick={()=> navigate(`/posts/${id}/edit`)}>編集</button>
      <IconButton aria-label="delete" onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
      {/* <ListItem
            sx={{textAlign:'center'}}
            key={post.id}
            disableGutters
            secondaryAction={
              <IconButton aria-label="delete" onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
              }
          >
      </ListItem> */}
    </div>
  )

};
export default Post;