import { connectMongoDB } from "../../../lib/mongodb";
import Post from "../../../models/post";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { title, img, content } = await req.json();

  await connectMongoDB();
  await Post.create({ title, img, content });
  return NextResponse.json({ message: "Post created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const posts = await Post.find({});
  return NextResponse.json({ posts }, { status: 200 });
}
