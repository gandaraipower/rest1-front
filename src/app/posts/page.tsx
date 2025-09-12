"use client";

import { useState, useEffect } from "react";

export default function Home() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/posts")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setPosts(data);
      });
  }, []);

  return (
    <div className="flex flex-col gap-9">
      <h1>글 목록</h1>
      <ul>
        {posts.map((post: any) => (
          <li key={post.id}>{post.id} : {post.subject}</li>
        ))}
      </ul>
    </div>
  )
}