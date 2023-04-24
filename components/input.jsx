import React, { useState, useRef, useEffect } from "react";


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
    } catch (error) {
      console.error(error);
      alert("Failed to send message");
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

  return (
    <div className="input-div">
      <form>
        <textarea
          onChange={(e) => setQues(e.target.value)}
          ref={ref}
          className="ques-input"
          placeholder="Send message....."
          disabled={isSubmitting}
          onKeyDown={(e) => {
  
            if(e.code == 'Enter'){
              handleSubmit(e)
            }
          }}
        />
        <button
          onClick={handleSubmit}
          className="btn btn-submit"
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
        <span className="material-symbols-outlined btn" disabled={!support}>
        mic
        </span>
        </div>
       
      </form>
      

    </div>
  );
}
