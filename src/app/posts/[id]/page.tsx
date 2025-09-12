"use client";

import {PostDto} from "@/type/post";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';   

export default function Home() {
    const {id}=useParams();

    const [post, setPost] = useState<PostDto | null>(null);
  
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;


    async function fetchPost() {
      const res = await fetch(`${baseUrl}/api/v1/posts/${id}`);
      const data = await res.json();
      setPost(data);
    }

    useEffect(()=>{
        fetchPost();
    },[]);

  return (
    <>
        <div className="flex flex-col gap-8">
    <h1>글 상세 보기</h1>

    {post === null && <div>Loading...</div>}

    {post !== null && (
    <div>
        <div>번호 : {post.id}</div>
        <div>제목 : {post.subject}</div>
        <div>내용 : {post.body}</div>
    </div>
    )}
    </div>
    </>
  );
}