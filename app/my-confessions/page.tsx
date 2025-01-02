import prisma from "@/lib/db";
import { getServerSession } from "next-auth"

export default async function MyConfessions(){
    const session = await getServerSession();
    if(!session){
        return(
          <div className="flex w-full h-screen justify-center items-center">
            Unauthorized pls signin to post
          </div>
        )
    }

    const user = session.user;
    console.log(user)

    const data = await prisma.post.findMany({
        where:{ 
            authorId: 1
        }
    })

    return(
        <div className="flex items-center justify-center">
            Hello
        </div>
    )
}