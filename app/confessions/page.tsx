import UpvoteButton from "@/components/upvoteButton";
import prisma from "@/lib/db";

export default async function Confessions(){
    const data = await prisma.post.findMany();
    return(
        <div className="grid grid-cols-3">
            {data.map((e)=>{return(
               <div className="m-5 border-[#a7a7a7] border-[1px] p-5 rounded-sm">
                <div className="flex justify-between"><h1 className="font-bold">{e.title}</h1><div className="flex flex-col items-center"><UpvoteButton id={e.id} /></div></div>
                <p>{e.content}</p>
               </div>   
            )})}
        </div>
    )
}