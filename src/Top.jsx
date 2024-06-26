import React from "react";

function Top({ posts }) {
  return (
    <div className="container sm:ml-64">
      <p className="m-4 text-gray-500 sm:hidden">メニューバーから詳細を確認できます</p>
      {posts.length > 0 && (
        <p className="m-4 text-gray-500 hidden sm:block">サイドバーから詳細を確認できます</p>
      )}
    </div>
  );
}

export default Top;
