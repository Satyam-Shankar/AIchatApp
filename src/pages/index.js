import { useRef, useState } from "react";
import Head from "next/head";
import Chat from "../../components/chat";
import Sidebar from "../../components/sidebar";

function App() {
  
  const [person,setPerson] = useState("Mahatma Gandhi")
  function handlePerson(person){
    setPerson(person)
  }

  return (
    <>
    <Head>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

    <title>Historichat</title>
    </Head>
  <div className="app">
    
      {
  console.log(person)
      }
    <Sidebar handlePerson={handlePerson}/>
    <Chat person={person}/>
    </div>

    </>
    
  )
  
}

export default App