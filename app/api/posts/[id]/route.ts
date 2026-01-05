import { connectMongoDB } from "../../../../lib/mongodb";
import Post from "@/models/post";
import { NextResponse } from "next/server";

type RouteParams = {
  params: {
    id: string;
  };
};

export async function GET(req: Request, { params }: RouteParams) {
  const { id } = await params;

  await connectMongoDB();
  const post = await Post.findOne({ _id: id });

  if (!post) {
    return NextResponse.json({ message: "Post not found" }, { status: 404 });
  }

  return NextResponse.json({ post }, { status: 200 });
}

export async function PUT(req: Request, { params }: RouteParams) {
  const { id } = await params;
  const { title: title, img: img, content: content } = await req.json();
  await connectMongoDB();
  await Post.findByIdAndUpdate(id, { title, img, content });
  return NextResponse.json({ message: "Post upDated" }, { status: 200 });
}

export async function DELETE(
  req: Request,
  // ไม่ต้องเปลี่ยน Type Definition ตรงนี้ สามารถใช้แบบเดิมได้
  { params }: { params: { id: string } }
) {
  try {
    // เพิ่ม 'await' เข้าไปตรงนี้ครับ
    const { id } = await params; // แก้ไข: ต้อง await params ก่อนดึง id

    await connectMongoDB();
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return NextResponse.json(
        { message: "ไม่พบข้อมูลที่ต้องการลบ" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "ลบสำเร็จ" }, { status: 200 });
  } catch (error) {
    // ควรจัดการ error ที่นี่ให้ละเอียดขึ้น
    console.error(error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์" },
      { status: 500 }
    );
  }
}
