import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { RedirectToSignIn } from "@clerk/nextjs"
import { redirect } from "next/navigation"

interface InviteCodePageProps{
    params:{
        inviteCode:string
    }
}

const InviteCodePage = async({params}:InviteCodePageProps) =>{
    const profile = await currentProfile()
    if(!profile){
        return <RedirectToSignIn/>
    }

    if(!params.inviteCode){
        return redirect("/")
    }
const existingUser = await db.server.findFirst({
    where:{
        inviteCode:params.inviteCode,
        members:{
            some:{
                profileId:profile.id
            }
        }
    }
})

if(existingUser){
    return redirect(`/servers/${existingUser.id}`)
}

const server = await db.server.update({
    where:{
        inviteCode:params.inviteCode
    },
    data:{
        members:{
            create:[
                {
                    profileId:profile.id
                }
            ]
        }
    }
})

if(server){
    return redirect(`/servers/${server.id}`)
}

    return null
}

export default InviteCodePage