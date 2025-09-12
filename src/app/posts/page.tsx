"use client";

import { useState, useEffect } from "react";

export default function Home() {

  const [posts, setPosts] = useState<{ id: number, subject: string }[]>([]);
  
  async function fetchPosts() {
    const res = await fetch("http://localhost:8080/api/v1/posts");
    const data = await res.json();
    setPosts(data);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return ( 
    <div className="flex flex-col gap-9">
      <h1>글 목록</h1>
      {posts.length === 0 && <div>Loading...</div>}
      {posts.length > 0 && (
      <ul>
        {posts.map((post: { id: number, subject: string }) => (
          <li key={post.id}>{post.id} : {post.subject}</li>
        ))}
      </ul>
      )}
    </div>
  )
}