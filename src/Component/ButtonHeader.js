import "./ButtonHeader.css";

import React from 'react'
import {useState, useEffect} from 'react'
import BodyList from "./BodyList";
import { useSelector, useDispatch } from "react-redux";
import {enqueue, dequeue, setQueue, setSilgeum} from './store';

function ButtonHeader() {

  const [count, setCount] = useState(0);
  const [modalQueue, setModalQueue] = useState([]); // 모달을 누른 순서대로 기록
  const [btn1, setBtn1] = useState(false);
  const [btn2, setBtn2] = useState(false);
  const [btn3, setBtn3] = useState(false);
  const [btn4, setBtn4] = useState(false);

  const silgeum = useSelector((state) => {
    return state.silgeum;
  });
  useEffect(() => {
    // Logs whenever silgeum changes
    console.log("Updated silgeum: ", silgeum);
    let updatedQueue = modalQueue;

    if (!updatedQueue.includes(2) && silgeum.value === 'Y') {
        console.log("here!!");
        updatedQueue = [...updatedQueue, 2];
    }

    if(updatedQueue.includes(2) && silgeum.value === 'N'){
        updatedQueue = modalQueue.filter(e=> e!==2);
    }
    setModalQueue(updatedQueue);
    dispatch(setQueue(updatedQueue));
    console.log(updatedQueue);

  }, [silgeum]);
  //console.log("header:" ,silgeum);

  //console.log(count);



    const dispatch = useDispatch();
    const globalQueue = useSelector((state) => {
        return state.queue;
    });

    const handleButtonClick = (id) => {
        let updatedQueue = modalQueue;
      
        // Toggle modalQueue based on button click
        if (modalQueue.includes(id)) {
          // Remove from queue
          updatedQueue = modalQueue.filter(e => e !== id);
          
          // If id is 2, reset silgeum to 'N'
          if (id === 2) {
            dispatch(setSilgeum('N'));
          }
        } else {
          // Add to queue
          updatedQueue = [...modalQueue, id];
          
          // If id is 2, set silgeum to 'Y'
          if (id === 2) {
            dispatch(setSilgeum('Y'));
          }
        }
        console.log(silgeum);
      
        // Automatically ensure 2 is added if silgeum is 'Y'
        
      
        // Update local and global queue
        setModalQueue(updatedQueue);
        dispatch(setQueue(updatedQueue));
      
        //console.log(updatedQueue);
    };


    
  return (
    <>
        <div className="Header">
            <div className="HeaderElement">
                <h4>기록하고 싶은 항목을 모두 클릭하세요</h4>    
            </div>
            <div className="HeaderElement">
                <button className="Button1" onClick={() => handleButtonClick(1)}>
                    도뇨 기록
                </button>
                <button className="Button2" onClick={() => handleButtonClick(2)}>
                    실금 기록
                </button>
                <button className="Button3" onClick={() => handleButtonClick(3)}>
                    수분섭취 기록
                </button>
                <button className="Button4" onClick={() => handleButtonClick(4)}>
                    이상증세 기록
                </button>
            </div>
        </div>
        
        <BodyList modalQueue={modalQueue}>


        </BodyList>
    </>
  )
}

export default ButtonHeader