import "./ButtonHeader.css";

import React from 'react'
import {useState} from 'react'
import BodyList from "./BodyList";

function ButtonHeader() {

  const [count, setCount] = useState(0);
  const [modalQueue, setModalQueue] = useState([]); // 모달을 누른 순서대로 기록
  const [btn1, setBtn1] = useState(false);
  const [btn2, setBtn2] = useState(false);
  const [btn3, setBtn3] = useState(false);
  const [btn4, setBtn4] = useState(false);

  //console.log(count);

  const handleButtonClick = (id) => {
    // 클릭한 버튼의 id를 기록하고 모달을 띄움
    let t = modalQueue;
    if(modalQueue.filter(e => e !== id).length === t.length){
        setModalQueue(prevQueue => [...prevQueue, id]);
    }else{
        setModalQueue(modalQueue.filter(e => e !== id));
    }
  };

    console.log(modalQueue);
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