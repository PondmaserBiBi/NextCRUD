"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

type Post = {
  title: string;
  img: string;
  content: string;
};

const EditPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);


  const getPostById = async () => {
    try {
      const res = await axios.get<{ post: Post }>(`/api/posts/${id}`);
      const post = res.data.post;

      setTitle(post.title);
      setImg(post.img);
      setContent(post.content);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) getPostById();
  }, [id]);

 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.put(`/api/posts/${id}`, {
        title,
        img,
        content,
      });

      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="container mx-auto py-10">
      <h3 className="text-3xl font-bold">Edit Post</h3>
      <hr className="my-3" />

      <Link
        href="/"
        className="bg-gray-500 inline-block text-white py-2 px-3 rounded my-2"
      >
        Go Back
      </Link>

      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          className="w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2"
          placeholder="Title"
        />

        <input
          value={img}
          onChange={(e) => setImg(e.target.value)}
          type="text"
          className="w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2"
          placeholder="Image URL"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          className="w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2"
          placeholder="Enter your content"
        />

        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-3 rounded"
        >
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPostPage;
