"use client";

import { PostDto } from "@/type/post";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {

  const [posts, setPosts] = useState<PostDto[]>([]);

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  async function fetchPosts() {
    const res = await fetch(`${baseUrl}/api/v1/posts`);
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
            <li key={post.id}>
            <Link href={`/posts/${post.id}`}>
              {post.id} : {post.subject}
            </Link>
          </li>
          ))}
        </ul>
      )}
    </div>
  )
}