import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {getPost, updatePost} from "../infra/api";

function PostEditModal({show, setShow, handleUpdateTitle}){
  const { id } = useParams();
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
    setError(null);
    try {
      const updatedPostData = { title };
      const res = await updatePost(id, updatedPostData);
      if (res.data.status === "ERROR") {
        const errorMessage = res.data.data.title ? res.data.data.title[0] : "An unexpected error occurred.";
        setError(errorMessage);
        setLoading(false);
      } else {
        handleUpdateTitle(title);
        setShow(false);
        setTitle("");
        setError(null);
        setLoading(false);
      }
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }

  if(show) {
    return(
      <div className="fixed top-0 left-0 w-full h-full bg-slate-900 bg-opacity-75 z-10">
        <div className="mx-auto mt-60 p-2 w-1/3 z-20 bg-white text-center rounded-lg">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <p className="text-left px-2 font-bold text-gray-600">リスト名を編集</p>
              <form className="mt-2" onSubmit={handleSubmit}>
                <div className="flex space-y-4 flex-col text-left my-4 px-2 text-black w-full">
                  <label htmlFor="title" className="font-light text-gray-500 text-sm">リスト名</label>
                  <input className="w-full border-b-2 border-gray-400 text-sm pl-2" type="text" value={title} onChange={handleTitleChange} id="title" placeholder="create a new list" required/>
                  {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </div>
                <div className="flex justify-end mx-2 space-x-2">
                  <div>
                    <button className="rounded text-gray-600 hover:bg-gray-300 p-2 text-sm" type="submit">編集</button>
                  </div>
                  <div>
                    <button className="rounded text-gray-600 hover:bg-gray-300 p-2 text-sm" onClick={()=> setShow(false)}>キャンセル</button>
                  </div>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    )
  }else{
    return null;
  }
};
export default PostEditModal;