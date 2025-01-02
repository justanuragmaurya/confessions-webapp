"use client"
import prisma from "@/lib/db";
import { ArrowBigUp } from "lucide-react"
import { useEffect, useState } from "react";

export default function UpvoteButton({id}:{id:number}){
    const [upvoted,setUpvoted] = useState(false);
    
    const handleClick=()=>{
        setUpvoted(!upvoted)
    }
    return(
        <>
        <h2>{""}</h2>
        <ArrowBigUp onClick={handleClick} className={`${upvoted?"fill-black":""}`}/>
        </>
    )
}