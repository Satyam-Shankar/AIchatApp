import { useRef, useState,useEffect } from "react";
import Head from "next/head";
import Chat from "../../components/chat";
import Sidebar from "../../components/sidebar";
import info from '../../components/data'
import { useAuth } from "../../contexts/AuthContext";
import { getFirestore, collection, doc,getDoc,addDoc,setDoc } from "firebase/firestore";
import {useRouter} from "next/router";
import app from '../../lib/firebase'

console.log(99)
export default function App() {

  
  const {user, loading} = useAuth()
  const router = useRouter()

  const [data, setData] = useState([])
  const [person, setPerson] = useState("")
  const [email, setEmail] = useState(user?.email || ' ')

  function handlePerson(person) {
      setPerson(person)
  }

    const db = getFirestore(app);
    const [conv, setConv] = useState({})


    useEffect(() => {
      async function read() {
        const docRef = doc(db, 'users', email)
        const snap = await getDoc(docRef)

        if (snap.exists()) {
          setData(snap.data().data)
        } else {
          setData(info)
        }
      }

      read()
    }, [])


    async function fbase(obj) {
      await setDoc(doc(db, "users", email), {
        data: obj
      });
    }


    function handleConv(conv) {


      setData(prev => {

        let i = prev.map(item => {

          if (item.name === person) {
            item.conv.push(conv);
          }

          return item

        });


        fbase(i)
        return i

      });
    }

    function updateConv(conv) {
      setData(conv)
    }

    useEffect(() => {
      console.log(data);
    }, [data])

    function error(person) {
      let bool = true
      setData(prev => {
        const arr = prev.map(item => {
          if (item.name === person) {
            if (bool === true) {
              console.log(4432);
              item.conv.length -= 1
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
            <link rel="icon" type="image/x-icon" href="/history.jpeg"/>
          </Head>
          <div className="app">

            <Sidebar handlePerson={handlePerson} db={db} conv={conv} updateConv={updateConv} info={data} fbase={fbase}/>
            <Chat person={person} db={db} conv={conv} handleConv={handleConv} setconv={setConv} data={data}
                  error={error}/>
          </div>


        </>

    )

  }



