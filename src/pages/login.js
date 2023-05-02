import React from "react";
import Login from "../../components/login";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../../contexts/AuthContext";
export default function login() {
  return (
      
        <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
      <Login />

      </div>
    </Container>
   
       
  )
}
