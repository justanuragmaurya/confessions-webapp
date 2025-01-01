"use client";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRef, useState, ChangeEvent } from "react";
import { PostData } from "@/utils/types";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { signIn, signOut, useSession } from "next-auth/react";
import prisma from "@/lib/db";

export default function PostConfesion() {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const [isAnonymous, setIsAnonymous] = useState(true);

  const { toast } = useToast();
  const session = useSession();

  const handleClick = async ()=>{   
    if(titleRef.current?.value==""||contentRef.current?.value == ""){
      toast({
        title: "Incomplete detials !",
        description: "Please fill all the required fields",
      })
      return 
    }
    const data:PostData = {
      title: titleRef.current?.value!,
      content: contentRef.current?.value!,
      image: imageRef.current?.value!,
      isAnonymous: isAnonymous
    }

    console.log(data);
    const resposne = await axios.post("/api/post",data);
    console.log(resposne)

  }

  const handleSwitchChange = () => {
    setIsAnonymous(!isAnonymous);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5 m-5">
        <h2 className="text-4xl font-bold">Confess Your Heart out</h2>
      <div className=":w-1/2 w-full">
        <div className="flex gap-5 items-center">
          <div className="w-full">
            <h2 className="">Title:</h2>
            <Input className="" type="" ref={titleRef}/>
          </div>
          <h2 className="">Stay Anonymous</h2>
          <Switch checked={isAnonymous} onClick={handleSwitchChange}/>
        </div>
        <h2>Content:</h2>
        <Textarea ref={contentRef}/>

        <h2>Add a image :</h2>
        <Input type="file" ref={imageRef}/>
      </div>
      <Button onClick={handleClick}>POST</Button>
    </div>
  );
}
