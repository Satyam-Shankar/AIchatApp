import { createContext,useContext, useEffect, useState } from "react";
import { auth } from "../components/firebase";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged } from "firebase/auth";


const AuthContext = createContext({})

export function useAuth(){
    return useContext(AuthContext)
}



export function AuthProvider({children}){
    const [user,setUser] = useState()
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        let unsubscribe;
        unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user)
            setLoading(false)
        });

        return unsubscribe
    },[])

    function signup(email,password){
        return createUserWithEmailAndPassword(auth,email,password)

    }

    function login(email,password){
        return signInWithEmailAndPassword(auth,email,password)
    }

    function resetPassword(email){
        return sendPasswordResetEmail(auth,email)
    }
    function logout()
    {
        signOut(auth)

    }
    const value = {
        user,
        signup,
        login,
        signout: logout,
        resetPassword
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

