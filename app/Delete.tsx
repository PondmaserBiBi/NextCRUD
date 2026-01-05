"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

type DeleteProps = {
  id: string;
};

const Delete = ({ id }: DeleteProps) => {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure?");
    if (!confirmed) return;

    try {
      await axios.delete(`/api/posts/${id}`);
      router.refresh(); 
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white border py-2 px-3 rounded-md my-2"
    >
      Delete
    </button>
  );
};

export default Delete;
