import React, { useEffect, useState } from "react";
import styles from '../src/styles/Home.module.css'


export default function Header(props){

    const [opacity,setOpacity] = useState(props.opacity)
    let [visible,setVisible] = useState(false)

    useEffect(() => {
        if(window.innerWidth<=850){
            setVisible(true)
        }
        else{
            setVisible(false)
        }
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
        <div className={`${styles.header}`} style={{opacity: opacity}}>
            <div>
               {visible && menu}
            <h4 className={`${styles.name}`}>{props.person}</h4>
            </div>
        </div>
    )
}