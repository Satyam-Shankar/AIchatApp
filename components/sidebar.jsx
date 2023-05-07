import React, { useState, useEffect, useRef } from "react";
import { getFirestore, collection, doc,getDoc,addDoc,setDoc, updateDoc } from "firebase/firestore";
import styles from '../src/styles/Home.module.css'
import {useAuth} from "../contexts/AuthContext";

export default function Sidebar({ person,handlePerson, db, conv, updateConv, info, fbase }) {
  const [data, setData] = useState(info);
  const [current, setCurrent] = useState();
  const [show, setShow] = useState(false);
  const [input, setInput] = useState("");
  const [visible, setVisible] = useState(false);
  const {logout} = useAuth()
    const sref = useRef()

    useEffect(() => {
    for (let item of data) {
      if (item.selected === true) {
        setCurrent(item.name);
        break;
      }
    }
  }, [data]); 

  useEffect(() => {
    console.log(info);
    setData(info);
  }, [info]);

  useEffect(() => {
    if (window.innerWidth <= 850) {
      setVisible(true);
    } else {
      setVisible(false);
    }

    const handleResize = () => {
      if (window.innerWidth <= 850) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth]);

  function Modal() {
    const ref = useRef(null);

    useEffect(() => {
      ref.current.focus();
    }, []);

    return (
      <div
        className={`main_modal`}
        onClick={(e) => {
          if (e.target.classList.contains("main-modal")) {
            setShow(false);
          }
        }}
      >
        <div className={`${styles.modal}`}>
          <h2>Add Chat</h2>
          <form>
            <label htmlFor="name">
              Enter the name of a famous historical personality
            </label>
            <input
              placeholder="Enter a name"
              name="name"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              ref={ref}
            />
            <div className={`${styles.button_wrapper}`}>
              <button
                  onClick={(e) => {
                      e.preventDefault();
                      if (input.trim() !== "") {
                          setData((prev) => {
                              const nameExists = prev.some((item) => item.name === input);
                              if (nameExists) {
                                  // If the input name already exists, mark it as selected and update the current person
                                  return prev.map((item) => {
                                      if (item.name === input) {
                                          item.selected = true;
                                      } else {
                                          item.selected = false;
                                      }
                                      return item;
                                  });
                              } else {
                                  // If the input name is new, add it to the array and mark it as selected
                                  const arr = prev.map((item) => {
                                      item.selected = false;
                                      return item;
                                  });
                                  arr.push({
                                      name: input,
                                      selected: true,
                                      conv: [],
                                  });
                                  return arr;
                              }
                          });
                          handlePerson(input);
                          setCurrent(input);
                          setShow(false);
                      }
                  }}
                className={`${styles.name_submit}`}
              >
                Submit
              </button>
              <button
                className={`${styles.name_cancel}`}
                onClick={(e) => {
                  e.preventDefault();
                  setShow(false);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  function handleClick(e) {
    const name = e.target.innerText;
      document.querySelector('.ques_input').disabled = false

    setData((prev) => {
      const arr = prev.map((item) => {
        if (item.name === name) {
          item.selected = true;
        } else {
          item.selected = false;
        }
        return item;
      });

      return arr;
    });

    setCurrent(name);
    handlePerson(name);

    if (window.innerWidth <= 850) {
      sref.current.classList.add("hide");
    }
  }



    useEffect(() => {
      console.log(data.length);

      if(data.length === 0){
        handlePerson('')
        document.querySelector('.ques_input').disabled = true
      }
      else {
        document.querySelector('.ques_input').disabled = false

      }
    },[data])

    function handleDelete(name) {
    setData(prev => {
        const filteredData = prev.filter(item => item.name !== name);
        if (current === name && filteredData.length > 0) {
            setCurrent(filteredData[0].name);
            handlePerson(filteredData[0].name)
            filteredData[0].selected = true
        }
        fbase(filteredData)

        
        return filteredData;
    });

    if(window.innerWidth<=850){
        sref.current.classList.add('hide')
    }
}

    const ele = data.map(item => (
        <div className={`${styles.name_item_div}`} key={item.name}>
            <li className={`${styles.name_item} ${item.selected ? styles.current : ''}`} onClick={handleClick}><span className={`${styles.text}`}>{item.name}</span></li>
            {current == item.name && <span className="material-symbols-outlined delete" onClick={() => handleDelete(item.name)}>delete</span>}
        </div>
    ))

    return (
        <div className={`${styles.sbar} sbar`} ref={sref}>
            <ul className={`${styles.nameL}`}>
                <button className={`${styles.btn} ${styles.add_chat}`} onClick={(e) => {
                    e.preventDefault()
                    setInput("")
                    setShow(prev => !prev)
                }}>
                    <span className={`${styles.plus}`}>+</span><span> Add Chat</span>
                </button>

                {ele}


                 { visible &&  <span className={`material-symbols-outlined ${styles.close}`} onClick={() => {
                   sref.current.classList.add('hide')

                }}>
                        close
                </span>}


                {show &&  <Modal />}
            </ul>
        </div>
    )
}
