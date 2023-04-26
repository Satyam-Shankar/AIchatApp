import { useRef, useState,useEffect } from "react";
import Head from "next/head";
import Chat from "../../components/chat";
import Sidebar from "../../components/sidebar";
import { initializeApp } from "firebase/app";
import info from '../../components/data'
import { getFirestore, collection, doc,getDoc,addDoc,setDoc } from "firebase/firestore";

function App() {
  const [data,setData] = useState([])
  const [person,setPerson] = useState("")
  const [email,setEmail] = useState('satyamshan bkar13@gmail.com')
  function handlePerson(person){
    setPerson(person)
  }

  const firebaseConfig = {
    apiKey: "AIzaSyDDDgG4yDPu8c3mrMMHY2ZyPQJDYs-SeO4",
    authDomain: "thetime-capsule.firebaseapp.com",
    projectId: "thetime-capsule",
    storageBucket: "thetime-capsule.appspot.com",
    messagingSenderId: "300164687581",
    appId: "1:300164687581:web:fabc0e4742533b8a921d34"
     };
  const app = initializeApp(firebaseConfig);


  const db = getFirestore(app);
  const [conv,setConv] = useState({})

     
     useEffect(() => {
        async function read(){
          const docRef = doc(db,'users',email)
          const snap = await getDoc(docRef)

          if(snap.exists()){
            setData(snap.data().data)
          }
          else{
            setData(info)
          }
        }

        read()
     },[])
    async function fbase(obj){
      await setDoc(doc(db, "users",email), {
        data:obj
      });
    }


function handleConv(conv){

 
  setData(prev => {
 
    let i =  prev.map(item => {
  
      if (item.name === person) {
        item.conv.push(conv);
      }
   
      return item
      
    });

   
    
    fbase(i)
    return i

  });
  }
  function updateConv(conv){
    setData(conv)
  }

  function error(person)
  {
        let bool = true
        setData(prev => {
          const arr = prev.map(item => {
            if(item.name === person){
              if(bool === true){
                console.log(4432);
                item.conv.pop()
                bool = false
              }
                
            }
            return item
          })

          return arr
        })
  }

  return (
    <>
    <Head>
  

    <title>Historichat</title>
    <link rel="icon" type="image/x-icon" href="/history.jpeg" />
    </Head>
  <div className="app">

    <Sidebar handlePerson={handlePerson} db={db} conv={conv} updateConv={updateConv} info={data} fbase={fbase}/>
    <Chat person={person} db={db} conv={conv} handleConv={handleConv} setconv={setConv} data={data} error={error}/>
    </div>

   

    </>
    
  )
  
}

export default App