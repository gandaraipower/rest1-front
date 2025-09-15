"use client";

import { fetchApi } from "@/lib/client";
import { PostDto } from "@/type/post";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState<PostDto[]>([]);

  useEffect(() => {
    fetchApi(`/api/v1/posts`).then(setPosts);
  }, []);

  return (
    <>
    <div className="flex flex-col gap-6">
    <div className="flex flex-col gap-6">
      <h1>글 목록</h1>
      {posts.length === 0 && <div>Loading...</div>}
      {posts.length > 0 && (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/posts/${post.id}`}>
                {post.id} : {post.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
    <div>
      <Link href="/posts/write">새 글 작성</Link>
    </div>
    </div>
    </>
  );
}