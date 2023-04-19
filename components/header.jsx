import React, { useEffect, useState } from "react";

export default function Header(props){

    const [opacity,setOpacity] = useState(props.opacity)
    let [visible,setVisible] = useState(false)

    useEffect(() => {
        window.addEventListener('resize', () => {
            console.log(window.innerWidth);
            if(window.innerWidth<=850){
                setVisible(true)
            }
            else{
                setVisible(false)
            }
        })
    },[])

    useEffect(() => {
        setOpacity(props.opacity)
        console.log(opacity);

        },[props.opacity])

    
            let menu = <span class="material-symbols-outlined menu" onClick={() => {
                document.querySelector('.sbar').classList.toggle('hide')
                console.log('hello');
            }}>
            menu
            </span>
        
        
    return (
        <div className={`header`} style={{opacity: opacity}}>
            <div>
               {visible && menu}
            <h4 className="name">{props.person}</h4>
           {/* <p className="last-seen">last seen 30th January 1948</p> */}
            </div>
        </div>
    )
}