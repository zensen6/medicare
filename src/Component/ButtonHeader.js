import "./ButtonHeader.css";

import React from 'react'
import {useState, useEffect} from 'react'
import BodyList from "./BodyList";
import { useSelector, useDispatch } from "react-redux";
import {enqueue, dequeue, setQueue, setWater, setPees, setSilgeum, setDate, setTimeRedux, setWeird, setYo} from './store';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretLeft, faTrash, faHouse, faX } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import {useNavigate} from "react-router-dom";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";


function ButtonHeader() {

  const [count, setCount] = useState(0);
  const [modalQueue, setModalQueue] = useState([]); // 모달을 누른 순서대로 기록
  const [btn1, setBtn1] = useState(false);
  const [btn2, setBtn2] = useState(false);
  const [btn3, setBtn3] = useState(false);
  const [btn4, setBtn4] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupVoice, setPopupVoice] = useState(false);

  const navigate = useNavigate();

  const silgeum = useSelector((state) => {
    return state.silgeum;
  });

  const date = useSelector((state) => {
    return state.value;
  });

  const time = useSelector((state) => {
    return state.value;
  });

  const yo = useSelector((state) => {
    return state.value;
  });

  const dispatch = useDispatch();

  const globalQueue = useSelector((state) => {
        return state.queue;
  });



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
    let updatedQueue = modalQueue;

    if (!updatedQueue.includes(2) && silgeum.value === 'Y') {
    }

    if(updatedQueue.includes(2) && silgeum.value === 'N'){
        //updatedQueue = modalQueue.filter(e=> e!==2);
    }
    setModalQueue(updatedQueue);
    dispatch(setQueue(updatedQueue));

  }, [silgeum]);
  //console.log("header:" ,silgeum);
  useEffect(()=>{

    dispatch(setDate(formattedDate));
    dispatch(setTimeRedux(formattedTime));
    
  },[]);

  /////////////////
  useEffect(()=> {
    console.log("Redux globalQueue state updated:", globalQueue.queue);
    setModalQueue(globalQueue.queue);
  },[globalQueue]);
  ////////////////////////


  //console.log(count);


    

    const saveByVoice = (e) => {
      setPopupVoice(true);

    };

    const onCloseVoice = (e) => {
      setPopupVoice(false);
    }


    const handleButtonClick = (id) => {
        let updatedQueue = modalQueue;
        if(modalQueue.includes(1) && id==2){
            setPopupMessage("도뇨기록에 중복되는 항목이 있습니다");

            // Hide the message after 1 second
            setTimeout(() => {
                setPopupMessage("");
            }, 2500);

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
            dispatch(setWeird("-"));
          }
          else if(id === 1){
            dispatch(setSilgeum('N'));
            dispatch(setYo(0));
          }
        } else {
          // Add to queue
          updatedQueue = [...modalQueue, id];
          
          // If id is 2, set silgeum to 'Y'
          if (id === 2) {
            dispatch(setSilgeum('Y'));
          }
        }
      
        // Automatically ensure 2 is added if silgeum is 'Y'
        
      
        // Update local and global queue
        setModalQueue(updatedQueue);
        dispatch(setQueue(updatedQueue));
      
        //console.log(updatedQueue);
    };


    
  return (
    <>
        <div className="Header">
            {popupMessage && (
                <div className="popup-message">
                    {popupMessage}
                </div>
            )}


            <div className="HeaderElement">
                <h4>기록하고 싶은 항목을 모두 클릭하세요</h4>    
                <FontAwesomeIcon icon={faHouse} style={{position:"absolute", right : "20px", top : "26px"}} onClick={(e)=>{navigate("/")}}/>
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

            {/*
            <div className="SaveInfoBtnVoice" onClick={() => saveByVoice()}>
               음성으로 기록하기
            </div>
            */}
        </div>
        
        <BodyList modalQueue={modalQueue}>


        </BodyList>

        {/*
        <ContainerSpeech2
          isVisible={popupVoice}
          onClose={onCloseVoice}
        />
        */}
    </>
  )
}

export default ButtonHeader





function ContainerSpeech2({isVisible, onClose}){
  const dispatch = useDispatch();
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [popupVoiceValid, setPopupVoiceValid] = useState("");
  const [savingModalVisible, setSavingModalVisible] = useState(false); // State for "Saving..." modal

  const globalQueue = useSelector((state) => {
    return state.queue;
  });
  
  useEffect(() => {
    if (isVisible) {
      console.log("visible");
      SpeechRecognition.startListening({ continuous: true });
      resetTranscript();
    } else {
      SpeechRecognition.stopListening();
    }

    // 컴포넌트가 사라질 때 녹음 중지
    return () => {
      SpeechRecognition.stopListening();
    };
  }, [isVisible, resetTranscript]);

  const Save = (e) => {

    //dispatch(setWeird(transcript));
    const [water, baenow, yo, silgeum] = transcript.split(" ");

    const isNumericString = (str) => {
      return !Number.isNaN(parseInt(str, 10));
    };


    if(!isNumericString(water) 
      || !isNumericString(baenow) 
      || !(parseInt(yo) >= 0 && parseInt(yo)<=3) 
      || !(parseInt(silgeum) === 0 
       || parseInt(silgeum) === 1))
    {

      setPopupVoiceValid("예시와 같이 형식에 맞게 말씀해 주세요.");
      setTimeout(() => {
        setPopupVoiceValid("");
      }, 2000);
      return;
    }
    else{

      setPopupVoiceValid("");
      dispatch(setWater(water));
      dispatch(setPees(baenow));
      dispatch(setYo(yo));
      dispatch(setSilgeum(silgeum === '1' ? 'Y' : 'N'));
      resetTranscript();

      setSavingModalVisible(true); // Show "Saving..." modal

      setTimeout(() => {
        let queue = [1, 3, 4];
        dispatch(setQueue(queue));
        setSavingModalVisible(false); // Hide "Saving..." modal after 500 ms
      }, 500);



      onClose();
    }
  }

  const Reset = (e) => {
    resetTranscript();
    setPopupVoiceValid("");
  }

  const Close = (e) => {
    resetTranscript();
    setPopupVoiceValid("");
    onClose();
  }


  if(!isVisible) return null;
  return(
      <div className="SpeechContainer2">

      <div style={{position:"absolute", top: "10px", right: "10px"}}>
          <FontAwesomeIcon icon={faX} onClick={Close}/>
      </div>
        { 
          popupVoiceValid &&
            <div className="popup-message">
                {popupVoiceValid}
            </div>
        }

        <div className="SpeechHeader" style={{marginTop:"10px"}}>수분섭취량, 배뇨량, 요절박, 실금여부 순서로 말씀해주세요</div>
        <div className="SpeechHeader2">
          <li className="Example">실금이 발생했다면 1, 아니면 0</li>
          <li className="Example">요절박 정도는 매우 심하면 3, 증상이 없으면 0</li>
        </div>
        <h2 className="Example">예시: 300 250 3(삼) 1(일)</h2>
        
        <div className="SpeechWaveContainer">
            <div className="SpeechWave"></div>
            <div className="SpeechWave"></div>
            <div className="SpeechWave"></div>
            <div className="SpeechWave"></div>
            <div className="SpeechWave"></div>
            <div className="SpeechWave"></div>
        </div>
        <input className="inputVoiceText2" value={transcript} readOnly />

        <div className="buttonContainer">
          <button className="resetButton" onClick={Reset}>기록 초기화</button>
          <button className="closeButton" onClick={Save}>저장</button>
        </div>


        {savingModalVisible && (
          <div className="saving-modal">
            <div className="saving-message">저장 중...</div>
          </div>
        )}
       
      </div>
  );

}