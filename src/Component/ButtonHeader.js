import "./ButtonHeader.css";

import React from 'react'
import {useState, useEffect} from 'react'
import BodyList from "./BodyList";
import { useSelector, useDispatch } from "react-redux";
import {enqueue, dequeue, setQueue, setSilgeum, setDate, setTimeRedux} from './store';

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

  const date = useSelector((state) => {
    return state.value;
  })

  const time = useSelector((state) => {
    return state.value;
  })

  const today = new Date();

// 연도, 월, 일을 각각 추출합니다
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // getMonth()는 0부터 시작하므로 +1이 필요
    const day = String(today.getDate()).padStart(2, '0');

    // "YYYY-MM-DD" 형식의 문자열로 만듭니다
    const formattedDate = `${year}-${month}-${day}`;


    const now = new Date();

// 시간을 추출합니다
    const hours = String(now.getHours()).padStart(2, '0'); // 0 ~ 23 범위의 시간
    const minutes = String(now.getMinutes()).padStart(2, '0'); // 0 ~ 59 범위의 분

    // "HH:MM" 형식의 문자열로 만듭니다
    const formattedTime = `${hours}:${minutes}`;



  useEffect(() => {
    // Logs whenever silgeum changes
    console.log("Updated silgeum: ", silgeum);
    let updatedQueue = modalQueue;

    if (!updatedQueue.includes(2) && silgeum.value === 'Y') {
    }

    if(updatedQueue.includes(2) && silgeum.value === 'N'){
        //updatedQueue = modalQueue.filter(e=> e!==2);
    }
    setModalQueue(updatedQueue);
    dispatch(setQueue(updatedQueue));
    console.log(updatedQueue);

  }, [silgeum]);
  //console.log("header:" ,silgeum);
  useEffect(()=>{

    dispatch(setDate(formattedDate));
    dispatch(setTimeRedux(formattedTime));
    
  },[]);
  //console.log(count);



    const dispatch = useDispatch();
    const globalQueue = useSelector((state) => {
        return state.queue;
    });

    const handleButtonClick = (id) => {
        let updatedQueue = modalQueue;
        if(modalQueue.includes(1) && id==2){
            return;
        }
        if(modalQueue.includes(2) && id==1){
            updatedQueue = modalQueue.filter(e => e !== 2);
            updatedQueue = [...updatedQueue, id];
            setModalQueue(updatedQueue);
            dispatch(setQueue(updatedQueue));
            return;
        }


      
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