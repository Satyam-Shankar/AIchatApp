import React, { useState, useEffect, useRef } from "react";
import info from "./data";

export default function Sidebar({ handlePerson }) {
    let [data, setData] = useState(info)
    let [current, setCurrent] = useState()
    let [show, setShow] = useState(false)
    let [input, setInput] = useState("")
    let [visible,setVisible] = useState(false)
   

    useEffect(() => {
        for (let item of data) {
            if (item.selected === true) {
                setCurrent(item.name);
                break; // break out of the loop when the selected item is found
            }
        }
    }, [data]);

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

    function Modal(){

        

        let ref = useRef(null)
        useEffect(() => {
            ref.current.focus()
        },[])

        return (
            <div className="main-modal" onClick={(e) => {
                if(e.target.classList.contains('main-modal')){
                    setShow(false)
                }
            }}>
                <div className="modal">
                    <h2>Add Chat</h2>
                    <form>
                        <label htmlFor="name">Enter a name of a famous historical personality</label>
                        <input
                            placeholder="Enter a name"
                            name="name"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            ref={ref}
                        />
                        <div className="button-wrapper">
                            <button onClick={(e) => {
                                e.preventDefault()
                                if (input.trim() != '') {
                                    setData(prev => {
                                        let arr = []
                                        for (let item of prev) {
                                            if (item.name == e.target.innerText) {
                                                item.selected = true;
                                            }
                                            else {
                                                item.selected = false;
                                            }
                                            arr.push(item)
                                        }
                                        setInput("")
                                        setShow(false)
                                        handlePerson(input)
                                        arr = [...arr,
                                            {
                                                name: input,
                                                selected: true,
                                                conv: [
                                                    {
                                                    }
                                                ]
                                            }
                                        ]
                                        return arr
                                    })
                                }
                            }} className="name-submit">Submit</button>
                            <button className="name-cancel" onClick={(e) => {
                                e.preventDefault()
                                setShow(false)
                            }}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    function handleClick(e) {
        const name = e.target.innerText;
        console.log(name)
        setData(prev => {
            let arr = []
            for (let item of prev) {
                if (item.name === name) {
                    item.selected = true;
                }
                else {
                    item.selected = false;
                }
                arr.push(item)
            }
            return arr;
        })
    
        setCurrent(name);
        handlePerson(name);
    }
    

    function handleDelete(name) {
    setData(prev => {
        const filteredData = prev.filter(item => item.name !== name);
        if (current === name && filteredData.length > 0) {
            setCurrent(filteredData[0].name);
            handlePerson(filteredData[0].name)
            filteredData[0].selected = true
        }
        return filteredData;
    });

    if(window.innerWidth<=850){
        document.querySelector('.sbar').classList.add('hide')

    }
}

    const ele = data.map(item => (
        <div className="name-item-div" key={item.name}>
            <li className={`name-item ${item.selected ? 'current' : ''}`} onClick={handleClick}><span className="text">{item.name}</span></li>
            {current == item.name && <span className="material-symbols-outlined delete" onClick={() => handleDelete(item.name)}>delete</span>}
        </div>
    ))

    return (
        <div className="sbar">
            <ul className="nameL">
                <button className="btn add-chat" onClick={(e) => {
                    e.preventDefault()
                    setInput("")
                    setShow(prev => !prev)
                }}>
                    <span className="plus">+</span><span> Add Chat</span>
                </button>

                {ele}


                 { visible &&  <span className="material-symbols-outlined close" onClick={() => {
                    document.querySelector('.sbar').classList.add('hide')

                }}>
                        close
                </span>}
                {show &&  <Modal />}
            </ul>
        </div>
    )
}
