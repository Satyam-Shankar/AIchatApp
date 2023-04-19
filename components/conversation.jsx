import React, { useEffect, useState, useRef } from "react";

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
            console.log(lastResponse);

            if(lastResponse && lastResponse.classList.contains('blinking-cursor')){
                setIsTyping(false)
            }
            else if (lastResponse && lastResponse.classList.contains('question')) {
                setIsTyping(true);
                console.log("In 1");
            } else if ( lastResponse) {
                setIsTyping(false);


            }
        }

        console.log(isTyping);

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
