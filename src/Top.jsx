import React from "react";

function Top({ posts }) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <div className="container ml-64">
      <p className=" m-4 text-gray-500">サイドバーから詳細を確認できます</p>
    </div>
  );
}

export default Top;
