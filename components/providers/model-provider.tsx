"use client"

import { useEffect, useState } from "react"
import { CreateServerModal } from "../models/create-server-modal"
import { InviteModal } from "../models/invite-model"

export const ModalProvider = () =>{
    const [isMounted,setIsMounted] = useState(false)

    useEffect(()=>{
        setIsMounted(true)
    },[])

    if(!isMounted){
        return null
    }
    return (
        <>
        <CreateServerModal/>
        <InviteModal/>
        </>
    )
}