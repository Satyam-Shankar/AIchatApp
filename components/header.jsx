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
        document.querySelector('.out').classList.toggle('hide')

        console.log('hello');
    }}>
            menu
            </span>


    return (
        <div>

            <div className={`${styles.header}`} style={{opacity: opacity}}>
                <div>
                    {visible && menu}
                    <div style={{display: "flex", flexDirection: "column", gap: "0px"}}>
                        <h2 className={`${styles.name}`}>{props.person}</h2>
                        <h6 className={styles.satyam}><a href="https://www.linkedin.com/in/satyamshankar/" target="_blank">By Satyam Shankar</a></h6>
                    </div>
                </div>

                <button className={`btn ${styles.logout} out`} onClick={logout}>
                    <span className="material-symbols-outlined">
                        logout
                    </span>
                </button>

            </div>


        </div>

    )
}