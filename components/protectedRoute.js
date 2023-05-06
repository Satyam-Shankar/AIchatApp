import React, {useEffect} from "react";
import {useAuth} from "../contexts/AuthContext";
import {useRouter} from "next/router";


export default function ProtectedRoute({children}){



    const {user} = useAuth()
    const router = useRouter()
    useEffect(() => {
        if(!user){
            router.push('/signup')
        }
    },[user,router])

    return (
        <>
            {user && children}
        </>
    )
}