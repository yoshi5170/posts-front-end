import axios from "axios";
import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.common["Content-Type"] = "application/json";

//作成
export const postPost = async (params) =>
  axios.post("/posts", snakecaseKeys(params));
//一覧
export const getPosts = async () =>
  axios({
    method: "get",
    url: "/posts",
  }).then((response)=> camelcaseKeys(response, {deep: true}));
//詳細

  export const getPost = async (params) =>
    axios({
      method: "get",
      url: `/posts/${params}`,
    }).then((response) => camelcaseKeys(response, { deep: true }));

// 削除
export const deletePost = async (params) =>
  axios({
    method: "delete",
    url: `/posts/${params}`,
  });

//編集
export const postUpdate = async (params, data) =>
  axios({
    method: "put",
    url: `/posts/${params}`,
    data: snakecaseKeys(data),
  }).then((response) => camelcaseKeys(response, { deep: true }));
