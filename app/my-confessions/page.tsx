import prisma from "@/lib/db";
import { getServerSession } from "next-auth";

export default async function MyConfessions() {
  const session = await getServerSession();
  if (!session) {
    return (
      <div className="flex w-full h-screen justify-center items-center">
        Unauthorized pls signin to post
      </div>
    );
  }

  const user = await prisma.user.findFirst({
    where:{
        email: session.user?.email!
    }
  })
  const data = await prisma.post.findMany({
    where: {
      authorId: user?.id,
    },
  });

  return (
    <div className="p-5 grid grid-cols-3 gap-5">
      {data.map((e) => {
        return (
          <>
            <div className="flex flex-col p-5 bg-slate-200 rounded-md justify-between h-full min-h-96">
              <div>
                <h2 className="text-2xl font-bold">{e.title}</h2>
                {e.isAnonymous?"":<div className="flex text-sm">by ~<h2>{user?.name}</h2></div>}
                <br />  
                <h2 className="">{e.content}</h2>
                <div>
                  {e.image?(<img className="max-h-48" src={`${e.image}`}/>):("")}
                </div>
              </div>
              <h2>{e.date.toDateString()}</h2>
            </div>
          </>
        );
      })}
    </div>
  );
}
