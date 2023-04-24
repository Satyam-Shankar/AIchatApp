import React, { useEffect, useState, useRef } from "react";

import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc,getDoc,addDoc,setDoc } from "firebase/firestore";

export default function Conversation(props){
    const [conv, setConv] = useState(props.conv[props.person] || []);
    const [isTyping, setIsTyping] = useState(false);
    const convRef = useRef(null);

    

     
           
        
        

    
    useEffect(() => {
        setConv(props.conv[props.person] || []);
      
    }, [props.conv, props.person]);

    useEffect(() => {
        if (convRef.current) {
            const convElement = convRef.current;
            const lastResponse = convElement.querySelector(".talk:last-child");
         
            if(lastResponse && lastResponse.classList.contains('blinking-cursor')){
                setIsTyping(false)
            }
            else if (lastResponse && lastResponse.classList.contains('question')) {
                setIsTyping(true);
              
            } else if ( lastResponse) {
                setIsTyping(false);


            }
        }

       

    }, [conv]);

    const obj = conv.map((item, index) => {
        return (
            <p key={index} className={index % 2 === 0 ? "question talk" : "response talk"}>
                {item}
            </p>
        );
    });

    const cursor = isTyping && <p className="response talk blinking-cursor">&#x2588;</p>;

    return (
        <div className="conv" onScroll={() => props.handleScroll()}>
            <div ref={convRef}>
                {obj}
                {cursor}
            </div>
        </div>
    );
}
