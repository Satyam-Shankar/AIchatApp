import React, {useEffect} from "react";
import {useRouter} from "next/router";
import {useAuth} from "../contexts/AuthContext";

export default function PrivateRoute({children}){

    const router= useRouter()

    const {user} = useAuth()

    useEffect(() => {

        if(!user){
            router.push('/signup')
        }

    },[user,router])

    return (
        <>
            {children}
        </>
    )
}