"use client";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

export default function PostConfesion() {
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const anonymousRef = useRef(null);

  return (
    <div className="flex flex-col items-center justify-center gap-5 m-5">
        <h2 className="text-4xl font-bold">Confess Your Heart out</h2>
      <div className="w-1/2">
        <div className="flex gap-5 items-center">
          <div className="w-full">
            <h2 className="">Title:</h2>
            <Input type="" ref={titleRef}/>
          </div>
          <h2 className="">Stay Anonymous</h2>
          <Switch defaultChecked ref={anonymousRef} />
        </div>
        <h2>Content:</h2>
        <Textarea ref={contentRef}/>

        <h2>Add a image :</h2>
        <Input type="file" ref={imageRef}/>
      </div>
      <Button>POST</Button>
    </div>
  );
}
