"use client";
import React, { useState } from "react";
import Link from "next/link";

import axios from "axios";
import { useRouter } from "next/navigation";

type CreatePostResponse = {
  message: string;
};

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [content, setContent] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !img || !content) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post<CreatePostResponse>("/api/posts", {
        
        title,
        img,
        content,
      });

      if (res.status === 201 || res.status === 200) {
        router.push("/");
      } else {
        throw new Error("Failed to create post");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };
  return (
    <div className="container mx-auto py-10">
      <h3 className="text-3xl font-bold">Create Post</h3>
      <hr className="my-3" />
      <Link
        href="/"
        className="bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2"
      >
        Go Back
      </Link>

      <form onSubmit={handleSubmit}>
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          type="text"
          className="w-75 block bg-gray-200 border py-2 px-3 rounded text-lg my-2"
          placeholder="Title"
        />
        <input
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setImg(e.target.value)
          }
          className="w-75  block bg-gray-200 border py-2 px-3 rounded text-lg my-2"
          placeholder="Img URL"
        />

        <textarea
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setContent(e.target.value)
          }
          name=""
          id=""
          cols={30}
          rows={10}
          className="w-75  block bg-gray-200 border py-2 px-3 rounded text-lg my-2"
          placeholder="Enter your content"
        ></textarea>
        <button
          type="submit"
          className="bg-green-500 text-white border py-2 px-3 rounded text-lg my-2"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};
export default CreatePostPage;
