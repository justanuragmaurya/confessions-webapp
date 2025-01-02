"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import Link from 'next/link';
import { Button } from "./ui/button";

export default function Header() {
  const session = useSession();
  return (
    <div className="flex justify-between py-5 px-3 border-[#dedede] border-[1px] items-center shadow-md">
      <div className="font-black text-2xl">LPU Confess</div>
      <div className="flex items-center">
        <div className="flex gap-2 px-4">
                <Link href={"/"}><h1>Home</h1></Link>
                |
                <Link href={"/confessions"}><h1>Confessions</h1></Link>
                |
                <Link href={"/my-confessions"}><h1>My Confessions</h1></Link>
                |
                <Link href={"/post"}><h1>Post Confessions</h1></Link>
        </div>
        <div>
          {session.status=="authenticated"?<Button onClick={()=>{signOut()}}>Logout</Button>:<Button onClick={()=>{signIn()}}>Login</Button>}
        </div>
      </div>
    </div>
  );
}
