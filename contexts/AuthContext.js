import app from '../lib/firebase';
import { auth } from '../lib/firebase';
import { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut ,sendPasswordResetEmail} from 'firebase/auth';
import { signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup } from 'firebase/auth';


const userContext = createContext({})


export function useAuth(){
    return useContext(userContext)
}

function AuthContext({children}){
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

    function google(){
        const provider = new GoogleAuthProvider()
        return signInWithPopup(
            auth, provider
        ).then(
            result => {
                const credential = GoogleAuthProvider.credentialFromResult(result)
                const token = credential.accessToken


            }
        )
    }
    const value = {
        user,
        signup,
        login,
        logout: logout,
        resetPassword,
        google
    }
    return (
        <userContext.Provider value={value}>
            {!loading && children}
        </userContext.Provider>
    )
}

export default AuthContext