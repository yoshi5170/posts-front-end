import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {getPost, updatePost} from "./infra/api";

function PostEdit(){
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