import React,{ useState, useEffect, use } from "react";
import Header from "./header";
import Conversation from "./conversation";
import Input from "./input";
import data from './data'
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc,getDoc,addDoc,setDoc } from "firebase/firestore";

export default function Chat(props){

  
  const [person,setPerson] = useState(props.person)
  const [email,setEmail] = useState('satyamshankar13y@gmail.com')

  const [opacity,setOpacity] = useState(1)
  
  const [data,setData] = useState({

  })



  
  useEffect(() => {
    setData(prev => {
      let obj = {};
      console.log(props.data);
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
  

  console.log(data);



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
      <Conversation person={person} conv={data} handleScroll = {handleScroll} db={props.db}/>
      <Input person = {person} handleConv = {props.handleConv} conv={props.conv} db={props.db}/>
    </div>
  )
}


