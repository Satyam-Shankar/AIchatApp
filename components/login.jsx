import React, { useRef, useState } from 'react'
import { Card,Alert,Form,Button } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/router'
import styles from '../src/styles/login.module.css'
import Image from "next/image";
import image from '../public/loginV.jpg'
export default function Login() {
    const router = useRouter()
    const {user,signup,login,google} = useAuth()
    const emailRef = useRef()
    const passwordRef = useRef()
    const [error,setError] = useState('')
    async function handleSubmit(e){
        e.preventDefault()
        console.log(user)
        try{
        console.log(12);

        await signup(emailRef.current.value,passwordRef.current.value)
        router.push('/')
        console.log(12);

        setError('')
        
        }
        catch(e){
            try{
            await signup(emailRef.current.value,passwordRef.current.value)
            setError('')
            }
            catch(e){

                console.log(String.toString)
                const errorMessage = e.toString().match(/Error: (.*) \(/)[2];

               // Output: "Password should be at least 6 characters"
                setError(e.toString())
                console.log(e)

            }
        }
    }

    async function handleLogin(e){
        e.preventDefault()
        try{
            console.log(12);

            await login(emailRef.current.value,passwordRef.current.value)
            router.push('/')
            console.log(12);

            setError('')

        }
        catch(e){




                console.log(String.toString)
                const errorMessage = e.toString().match(/Error: (.*) \(/)[2];

                // Output: "Password should be at least 6 characters"
                setError(e.toString())
                console.log(e)


        }
    }

    console.log(error)
  return (
    <>
      <div className={styles.login}>
          {error!=='' && <Alert variant="danger">{error}</Alert>}

        <div className={styles.container}>
            {/*<Image src={image} alt="" width={400} height={500} className={styles.limage}/>*/}

          <form className={styles.lform}>
              <h2 className={styles.head}>Log In / Sign Up</h2>

            <div className={styles.group}>
              <label className={styles.label}>Email</label>
              <input type="email" ref={emailRef} required className={styles.input}/>
            </div>
            <div className={styles.group}>
              <label className={styles.label}>Password</label>
              <input type="password" ref={passwordRef} required className={styles.input}/>
            </div>
            
           <div className={styles.btns}>
               <button type="submit" className={styles.submit} onClick={handleSubmit}>
                   Sign Up
               </button>
               <button type="submit" className={styles.submit} onClick={handleLogin}>
                   Log In
               </button>
           </div>

              <h4>
                  Use other Sign In options
              </h4>

              <button className={styles.others} onClick={async (e) => {
                  e.preventDefault()
                  try {

                      await google()
                      router.push('/')
                  }
                  catch (e) {
                      console.log(e)
                  }
              }}>Google sign in</button>
          </form>
        </div>
      </div>

    </>
  )
}
