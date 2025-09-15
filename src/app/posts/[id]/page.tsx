"use client";

import { fetchApi } from "@/lib/client";
import { PostDto, PostCommentsDto } from "@/type/post";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { id: postId } = useParams();
  const router = useRouter();

  const [post, setPost] = useState<PostDto | null>(null);
  const [postComments, setPostComments] = useState<PostCommentsDto[] | null>(null);

  useEffect(() => {
    fetchApi(`/api/v1/posts/${postId}`).then(setPost)
      .catch((error) => { 
        alert(error);
        router.replace("/posts");
      });
    fetchApi(`/api/v1/posts/${postId}/comments`).then(setPostComments);
  }, []);

  const deletePost = (id: number) => {

    fetchApi(`/api/v1/posts/${postId}`, {
      method: "DELETE",
    }).then((data) => {
      alert(data.msg);
      router.replace("/posts");
    });
  };

  const deletePostComment = (commentId: number) => {
    fetchApi(`/api/v1/posts/${postId}/comments/${commentId}`, {
      method: "DELETE",
    }).then((data) => {
      alert(data.msg);

      if (postComments === null) return;
      //리렌더링을 위한 댓글 배열 교체 필요
      setPostComments(postComments.filter((comment) => comment.id !== commentId));
    });
  };

  if (post === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>글 상세 보기</h1>

      <div>
        <div>번호 : {post.id}</div>
        <div>제목 : {post.title}</div>
        <div>내용 : {post.content}</div>
      </div>

      <div className="flex gap-4">
        <Link href={`/posts/${post?.id}/edit`} className="border-2 p-2 rounded">수정</Link>
        <button className="border-2 p-2 rounded text-red-500"
          onClick={() => deletePost(post.id)}>삭제</button>
      </div>

      <h2>댓글 목록</h2>

      {postComments === null && <div>Loading...</div>}

      {postComments !== null && postComments.length === 0 && <div>댓글이 없습니다.</div>}

      {postComments !== null && postComments.length > 0 && (
        <ul className="flex flex-col gap-2">
          {postComments.map((postComment) => (
            <li key={postComment.id} className="flex gap-2 items-center">
              <span>{postComment.id} :</span>
              <span>{postComment.content}</span>
              <button className="border-2 p-2 rounded"
              >수정</button>
              <button className="border-2 p-2 rounded text-red-500"
                onClick={() => {
                  deletePostComment(postComment.id);
                }}
              >삭제</button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}