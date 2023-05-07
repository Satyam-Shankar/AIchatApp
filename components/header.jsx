import React, { useEffect, useState } from "react";
import styles from '../src/styles/Home.module.css'
import {useAuth} from "../contexts/AuthContext";

export default function Header(props){

    const [opacity,setOpacity] = useState(props.opacity)
    let [visible,setVisible] = useState(false)
    const {logout} = useAuth()
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
        <div>

            <div className={`${styles.header}`} style={{opacity: opacity}}>
                <div>
                    {visible && menu}
                    <h2 className={`${styles.name}`}>{props.person}</h2>
                </div>

                <h6><a href="https://www.linkedin.com/in/satyamshankar/" target="_blank">By Satyam Shankar</a></h6>
                <button className={`btn ${styles.logout}`} onClick={logout}>
                    <span className="material-symbols-outlined">
                        logout
                    </span>
                </button>

            </div>


        </div>

    )
}