import React,{ useState, useEffect } from "react";
import Header from "./header";
import Conversation from "./conversation";
import Input from "./input";

export default function Chat(props){

  const [person,setPerson] = useState(props.person)
  console.log(person);
  const [conv,setConv] = useState([])
  const [opacity,setOpacity] = useState(1)
  
  function handleConv(conv){
    setConv(
      prev => {
        let history = prev[person] || []
        console.log(history);

        return {
          ...prev,
          [person]:[...history,conv]
        }
      }
    )
    }
  

  console.log(conv);

  useEffect(() => {
    setPerson(props.person)
  }, [props.person])

  function handleScroll()
  {
    
      setOpacity(1)

  }

  return (
    <div className="main">
      <Header person={person} opacity={opacity}/>
      <Conversation person={person} conv={conv} handleScroll = {handleScroll}/>
      <Input person = {person} handleConv = {handleConv} conv={conv}/>
    </div>
  )
}


