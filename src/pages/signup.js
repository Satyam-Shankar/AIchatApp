import React, {useEffect} from "react";
import Signup from "../../components/signup";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../../contexts/AuthContext";
export default function signup() {


  return (
      <AuthProvider>
        <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
      <Signup />

      </div>
    </Container>
      </AuthProvider>
       
  )
}
