import React, { useState, useRef, useEffect } from "react";
import styles from '../src/styles/Home.module.css'


export default function Input(props) {
  const [person, setPerson] = useState(props.person);
  const [ques, setQues] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const ref = useRef(null);
  const [support,setSupport] = useState(true)

  useEffect(() => {
    setPerson(props.person)
  },[props.person])

  useEffect(() => {
    if(window.speechRecognition || window.webkitSpeechRecognition){
      setSupport(true)
    }
    else{
      setSupport(false)
    }
  },[])

  async function handleSubmit(e) {
    e.preventDefault();
    if (ques.trim() === "") {
      alert("Enter some message");
      return;
    }
    props.handleConv(ques)
    setIsSubmitting(true);
    let val = ref.current.value;
    ref.current.value = ""
    // ref.current.disabled = true

    try {
      const res = await fetch('/api/generate', {
        
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ person: person, question: val }),
      });

      const data = await res.json();
   
      const response = data.data.choices[0].message.content;
      props.handleConv(response);
      setQues("");
      ref.current.disabled = false
      console.log(ref.current);

    } catch (error) {
      // console.error(error);
      alert("Failed to send message");
      console.log(error);
      props.handleError(true)
    } finally {
      setIsSubmitting(false);
    }
  }
  function handleSpeech(){
    
    if(window.speechRecognition || window.webkitSpeechRecognition){
      const SpeechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.start()
      recognition.onresult = (e) => {
      let val = e.results[0][0].transcript;
      ref.current.value = val;
      setQues(val);
    }
      recognition.onspeechend = () => {
        recognition.stop();
    };
    } 
   
    
    
 
  }

  useEffect(() => {
    if(person == ''){
      ref.current.disabled = true
    }
    else{
      ref.current.disabled = false
    }
  },[person])

  return (
    <div className={"input-div "+styles.input_div}>
      <form>
        <textarea
          onChange={(e) => setQues(e.target.value)}
          ref={ref}
          className={`ques_input ${styles.ques_input}`}
          placeholder="Send message....."
          disabled
          onKeyDown={(e) => {
  
            if(e.code == 'Enter'){
              handleSubmit(e)
            }
          }}
        />
        <button
          onClick={handleSubmit}
          className={`${styles.btn} ${styles.btn_submit}`}
          disabled={isSubmitting}
          
        >
          <span
            className="material-symbols-outlined"
            style={{ opacity: isSubmitting ? 0.5 : 1 }}
          >
            send
          </span>
        </button>
        <div className="mic" onClick={handleSpeech} >
        <span className={`material-symbols-outlined ${styles.btn}`} disabled={!support}>
        mic
        </span>
        </div>
       
      </form>
      

    </div>
  );
}
