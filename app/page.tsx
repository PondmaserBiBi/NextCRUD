"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import Delete from "./Delete";

type Post = {
  _id: string;
  title: string;
  img: string;
  content: string;
};

type GetPostsResponse = {
  posts: Post[];
};

export default function Home() {
  const [postData, setPostData] = useState<Post[]>([]);

  const getPosts = async () => {
    try {
      const res = await axios.get<GetPostsResponse>("/api/posts");
      setPostData(res.data.posts);
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <main className="container mx-auto my-3">
      <h1>NextJS CRUD</h1>
      <hr className="my-3" />
      <button className="bg-green-400 text-white border py-2 px-3 rounded-md text-lx my-2 ">
        <Link href="/create">Create Post</Link>
      </button>

      {postData && postData.length > 0 ? (
        postData.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-4 mt-3 gap-5"
          >
            <div className="shadow-xl my-10 p-10 rounded-xl">
              <h3>{item.title}</h3>
              <Image
                width={300}
                height={200}
                className="rounded my-3"
                src={item.img}
                alt={item.title}
              />
              <p>{item.content}</p>
              <div className="mt-5">
                <Link
                  className="bg-gray-500 text-white border py-2 px-3 rounded-md text-lx my-2"
                  href={`/edit/${item._id}`}
                >
                  Edit
                </Link>
                <Delete id={item._id} />
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>You do not have any posts yet</p>
      )}
    </main>
  );
}
