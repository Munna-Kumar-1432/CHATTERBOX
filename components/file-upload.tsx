"use client"

import { UploadDropzone } from "@/lib/uploadthing";
import { X } from "lucide-react";
import Image from "next/image";

interface fileUploadProps{
    onChange:(url?:string)=>void;
    value:string;
    endpoint:"messageFile" | "serverImage"
}
export const FileUpload  =({onChange,value,endpoint}:fileUploadProps) =>{
    const fileType = value?.split(".").pop()
    if(value && fileType !== "pdf"){
        return (
            <div className="h-20 w-20 relative">
                <Image fill src={value} alt="upoad" className="rounded-full"/>
                <button onClick={()=>onChange("")} className="absolute bg-rose-500 p-1 rounded-full top-0 right-0 shadow-sm" type="button">
                    <X className="size-4"/>
                </button>
            </div>
        )
    }
    return (
        <UploadDropzone
         endpoint={endpoint}
         onClientUploadComplete={(res)=>{
            onChange(res?.[0].url)
         }}
         onUploadError={(error:Error)=>{
            console.log(error)
         }}
        />
    )
}