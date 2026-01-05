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
      // แก้ไข URL ตรงนี้: ลบ "?id=" ออก แล้วต่อ id เข้าไปตรงๆ
      await axios.delete(`/api/posts/${id}`);
      router.refresh();
    } catch (error) {
      console.error("Delete Error:", error);
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
