import React, { useRef, useState } from 'react'
import { Card,Alert,Form,Button } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { useRouter } from 'next/router'
import Link from "next/link";

export default function resetPassword() {
    const router = useRouter()
    const {user,signup,login,resetPassword} = useAuth()
    const emailRef = useRef()
    const [error,setError] = useState()
    async function handleSubmit(e){
        e.preventDefault()
        await resetPassword(emailRef.current.value)

    }
    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Log In</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {user && user.email}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>


                        <Button className="w-100 mt-2 mb-2" type="submit">
                            Log In
                        </Button>
                    </Form>
                </Card.Body>

            </Card>
            <div className="w-100 text-center mt-2">
                Need an account? <Link href='/signup'>Sign Up</Link>
            </div>
            <div className="w-100 text-center mt-2">
                <Link href='/forgot-password'>Forgot Password</Link>
            </div>
        </>
    )
}
