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


// DELETE /api/posts/[id]
export async function DELETE(req: Request, { params }: RouteParams) {
  const { id } = await params;

  try {
    await connectMongoDB();

    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return NextResponse.json(
        { message: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Post deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error deleting post" },
      { status: 500 }
    );
  }
}