import { connectMongoDB } from "../../../../lib/mongodb";
import Post from "@/models/post";
import { NextResponse } from "next/server";

interface RouteParams {
  // ยืนยันว่า params เป็น Promise
  params: Promise<{ id: string }>; 
}

export async function GET(req: Request, { params }: RouteParams) {
  const { id } = await params;
  // ... (โค้ด GET เดิม)
  await connectMongoDB();
  const post = await Post.findOne({ _id: id });

  if (!post) {
    return NextResponse.json({ message: "Post not found" }, { status: 404 });
  }

  return NextResponse.json({ post }, { status: 200 });
}

export async function PUT(req: Request, { params }: RouteParams) {
  const { id } = await params;
  // ... (โค้ด PUT เดิม)
  const { title: title, img: img, content: content } = await req.json();
  await connectMongoDB();
  await Post.findByIdAndUpdate(id, { title, img, content });
  return NextResponse.json({ message: "Post upDated" }, { status: 200 });
}

export async function DELETE(
  req: Request,
  { params }: RouteParams // <<< แก้ไขตรงนี้ให้ใช้ RouteParams
) {
  try {
    const { id } = await params; // <<< และบรรทัดนี้ต้องมี await

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
    console.error(error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์" },
      { status: 500 }
    );
  }
}
