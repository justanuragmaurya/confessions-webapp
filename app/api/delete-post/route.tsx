import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const data: { id: number } = await req.json();
    const id = data.id;
    try {
        const query = await prisma.post.delete({
            where: {
                id: id
            }
        });
        console.log(query);
    } catch (e) {
        console.log(e);
    }
    return NextResponse.json({ message: "Post deleted successfully" });
}