// import { auth } from "@clerk/nextjs/server";
// import { createUploadthing, type FileRouter } from "uploadthing/next";
// import { UploadThingError } from "uploadthing/server";

// const f = createUploadthing();

// const handleAuth = () =>{
//   const userId = true
//   if(!userId) throw new Error("Something went wrong")
//     return {userId:userId}
// }

// export const ourFileRouter = {
//   serverImage:f({image:{maxFileSize:"4MB",maxFileCount:1}})
//   .middleware(()=>handleAuth())
//   .onUploadComplete(()=>{}),


//   messageFile:f(["image","pdf"])
//   .middleware(()=>handleAuth())
//   .onUploadComplete(()=>{})
// } satisfies FileRouter;

// export type OurFileRouter = typeof ourFileRouter;

import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const handleAuth = async() => {
  const { userId } = await auth();
  
  if (!userId) {
    throw new UploadThingError("Unauthorized");
  }
  
  return { userId };
}

export const ourFileRouter = {
  serverImage: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 }
  })
  .middleware(() => handleAuth())
  .onUploadComplete(async ({ metadata }) => {
    console.log("Upload complete for userId:", metadata.userId);
  }),

  messageFile: f(["image", "pdf"])
  .middleware(() => handleAuth())
  .onUploadComplete(async ({ metadata }) => {
    console.log("Upload complete for userId:", metadata.userId);
  })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;