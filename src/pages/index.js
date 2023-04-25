import { useRef, useState,useEffect } from "react";
import Head from "next/head";
import Chat from "../../components/chat";
import Sidebar from "../../components/sidebar";
import { initializeApp } from "firebase/app";
import info from '../../components/data'
import { getFirestore, collection, doc,getDoc,addDoc,setDoc } from "firebase/firestore";

function App() {
  const [data,setData] = useState([])
  const [person,setPerson] = useState("Mahatma Gandhi")
  const [email,setEmail] = useState('satyamshankar13y@gmail.com')
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
     console.log(conv);
     
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

    console.log(data);
function handleConv(conv){

 
  setData(prev => {
    let i =  prev.map(item => {
      if (item.name === person) {
        // Do something
        item.conv.push(conv);
      }
      return item
      
    });
    fbase(i)
    return i

  });
  


 
  setConv(
    prev => {
   

      let history = prev[person] || []
      
      return {
        ...prev,
        [person]:[...history,conv]
      }
    }
  )
  }



  return (
    <>
    <Head>
  

    <title>Historichat</title>
    <link rel="icon" type="image/x-icon" href="/history.jpeg" />
    </Head>
  <div className="app">

    <Sidebar handlePerson={handlePerson} db={db} conv={conv} handleConv={handleConv} info={data} fbase={fbase}/>
    <Chat person={person} db={db} conv={conv} handleConv={handleConv} setconv={setConv} data={data}/>
    </div>

   

    </>
    
  )
  
}

export default App