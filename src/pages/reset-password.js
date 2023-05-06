import React, { useRef, useState } from 'react'
import { Card,Alert,Form,Button } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { useRouter } from 'next/router'

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
                    <h2 className="text-center mb-4">Reset Password</h2>


                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                    </Form>

                    <button onClick={handleSubmit}>
                        Submit
                    </button>
                </Card.Body>
            </Card>
        </>
    )
}
