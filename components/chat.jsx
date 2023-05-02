import React,{ useState, useEffect, use } from "react";
import Header from "./header";
import Conversation from "./conversation";
import Input from "./input";

export default function Chat(props){

  
  const [person,setPerson] = useState(props.person)
  const [email,setEmail] = useState('satyamshankar13y@gmail.com')

  const [opacity,setOpacity] = useState(1)
  
  const [data,setData] = useState({

  })

  const [error,setError] = useState(false)


  function handleError(val){
    props.error(person)
  }
  
  useEffect(() => {
    setData(prev => {
      let obj = {};

      let arr = props.data;

      for(let item of arr){
        obj = {
          ...obj,
          [item.name]:item.conv
        }
      }

      return obj
    })
  },[props.data])
  
  




  useEffect(() => {
    setPerson(props.person)
  }, [props.person])

  

  function handleScroll()
  {
    
      setOpacity(1)

  }

  return (
    <div className="main">
      <Header person={person} opacity={opacity}  db={props.db}/>
    <Conversation person={person} conv={data} handleScroll = {handleScroll} db={props.db} handleError={handleError} error={error}/>
      <Input person = {person} handleConv = {props.handleConv} conv={props.conv} db={props.db} error={props.error} handleError={handleError}/>
    </div>
  )
}


