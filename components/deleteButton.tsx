"use client"

import axios from "axios"
import { Trash2Icon } from "lucide-react"
import { useRouter } from "next/navigation"

export default function DeleteButton({id}:{id:number}){
    const router = useRouter()
    const handleClick = ()=>{
        async function deletePost(){
            const response = await axios.post("/api/delete-post", { id: id });
            console.log(response)
        }
        deletePost();
        router.refresh();
    }

    return(
        <Trash2Icon onClick={handleClick}/>
    )
}   