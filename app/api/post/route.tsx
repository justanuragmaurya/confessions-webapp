import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { PostData } from "@/utils/types";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body: PostData = await req.json();
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json(
      {
        message: "unauthorized",
      },
      { status: 200 }
    );
  }
  const user = session.user;
  
  if(!user){
    return NextResponse.json(
        {
          message: "unauthorized",
        },
        { status: 200 }
    );
  }
  
  try {
    await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        upvotes: 0,
        isAnonymous: body.isAnonymous,
        image: body.image,
        authorId: user.id,
      },
    });
  }catch (error) {
    return NextResponse.json({ message: "An error occured" }, { status: 400 });
  }
  return NextResponse.json(
    { message: "POST CREATED SUCCESFULLY" },
    { status: 200 }
  );
}
