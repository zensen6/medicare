import "./BodyList.css";
import './Popup.css';
import React from 'react';
import List1 from "./List1";
import List2 from "./List2";
import List3 from "./List3";
import List4 from "./List4";
import './List.css';
import data from "../Data/data.json";
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from "react-router-dom";
import {useRef, useEffect, useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faWhiskeyGlass, faGlassWater, faBottleWater, faX, faMicrophone } from "@fortawesome/free-solid-svg-icons";
import {changeState, setDate, setSilgeum, setTimeRedux, setQueue, enqueue, setPees, setUrl, setWater, setWeird, setYo, setPopUp, setFrequentList, setCustomList, setSelectedList, setMicro, setLastInfo} from "./store";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";



function BodyList(props) {

  useEffect(() => {
    // 페이지 로드 시 화면을 맨 위로 이동
    window.scrollTo(0, 0);
  }, []); 

  const [isSavePopup, setIsSavePopup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nameCup = useRef();
  const ml = useRef();
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const handleDateChange = (newDate) => {
    dispatch(setDate(newDate));
  };

  const handleTimeChange = (newTime) => {
    dispatch(setTimeRedux(newTime));
  };

  const yes = useSelector((state) => {
    return state.isYes;
  });

  const date1 = useSelector((state) => {
    return state.date;
  });

  const timeR = useSelector((state) => {
    return state.time;
  });

  const water = useSelector((state) => {
    return state.water;
  });

  const pees = useSelector((state) => {
    return state.pees;
  });

  const silgeum = useSelector((state) => {
    return state.silgeum;
  });

  const yo = useSelector((state) => {
    return state.yo;
  });

  const weird = useSelector((state) => {
    return state.weird;
  });

  const url = useSelector((state) => {
    return state.url;
  });

  const globlaQueue = useSelector((state) => {
    return state.queue.queue;
  });

  const popup = useSelector((state) => {
    return state.popup;
  }); 

  const frequentList = useSelector((state) => {
    return state.frequentList;
  });

  const customList = useSelector((state) => {
    return state.customList;
  });

  const selectedList = useSelector((state) => {
    return state.selectedList;
  });

  const micro = useSelector((state) => {
    return state.micro;
  });

  const lastInfo = useSelector((state) => {
    return state.lastInfo;
  });

  const Save = (e) => {
    const dataJson = {
      date : date1,
      time : timeR,
      drunk : water,
      water : pees,
      yo : yo,
      silgeum : silgeum,
      weird : weird,
      url : url,
      count : "Y",
    }
    if(timeR["value"].split(":")[0] < "04"){
      setIsSavePopup(true);
      return;
    }else{
      if(localStorage.getItem('data')){
        localStorage.setItem('data', JSON.stringify([...JSON.parse(localStorage.getItem('data')), dataJson]));
      }else{
        localStorage.setItem('data', JSON.stringify([dataJson]));
      }
    }

    dispatch(setLastInfo({count:"Y", water:pees}));

    dispatch(setUrl("-"));
    dispatch(setWater(0));
    dispatch(setPees(0));
    dispatch(setYo(0));
    dispatch(setSilgeum('N'));
    dispatch(setWeird("-"));
    dispatch(setDate(''));
    dispatch(setTimeRedux(''));

    navigate('/loading');
  }

  const { modalQueue } = props;



  function l1(idx) {

    if(idx === 2){
      const upI = modalQueue[0];
      return <List1 className={`Secu0${upI}`} />;
    }
    if(idx === 3){
      const upI = modalQueue[1];
      return <List1 className={`Secu1${upI}`} />;
    }

    return <List1 className={`Sec${idx}`} />;
  }
  
  

  function l2(idx) {

    if(idx === 2){
      const upI = modalQueue[0];
      return <List2 className={`Secu0${upI}`} />;
    }
    if(idx === 3){
      const upI = modalQueue[1];
      return <List2 className={`Secu1${upI}`} />;
    }

    return <List2 className={`Sec${idx}`} />;
  }
  
  function l3(idx) {

    if(idx === 2){
      const upI = modalQueue[0];
      return <List3 className={`Secu0${upI}`} />;
    }
    if(idx === 3){
      const upI = modalQueue[1];
      return <List3 className={`Secu1${upI}`} />;
    }

    return <List3 className={`Sec${idx}`} />;
  }


  function l4(idx) {

    if(idx === 2){
      const upI = modalQueue[0];
      return <List4 className={`Secu0${upI}`} />;
    }
    if(idx === 3){
      const upI = modalQueue[1];
      return <List4 className={`Secu1${upI}`} />;
    }

    return <List4 className={`Sec${idx}`} />;
  }
  
  const componentMap = {
    1: l1,
    2: l2,
    3: l3,
    4: l4
  };


  const unSelect = (e, item) => {
    const usList = frequentList.filter(c => c.name !== item.name);
    if (Array.isArray(usList)) { // Check if it's an array
      dispatch(setFrequentList(usList));
    } else {
      console.error("Expected usList to be an array but got:", usList);
    }
    dispatch(setCustomList([...customList, item]));
  };
  

  const Select = ((e, item) => {

    if(frequentList != null){
      if(frequentList.length === 4){
        return;
      }
    }
    let List = customList.filter(c => c.name !== item.name);
    if(Array.isArray(List)){
      dispatch(setCustomList(List));
    }
    dispatch(setFrequentList([...frequentList,item]));
  });

  const save = (e => {
    if(!ml.current.value){
      return;
    }
    dispatch(setCustomList([...customList,{name:nameCup.current.value, volume:ml.current.value}]));
    dispatch(setSelectedList(frequentList));
  }) 

  const Close = (e => {
    dispatch(setSelectedList(frequentList));
    dispatch(setPopUp(false));
  })


  const SpeechClose = (e => {
    dispatch(setMicro(false));
  })

//[{"date":{"value":"2024-11-03"},"time":{"value":"02:18"},"drunk":{"value":350},"water":{"value":"130"},"yo":{"value":"1"},"silgeum":{"value":"N"},"weird":{"value":""},"url":{"value":""},"count":"N"},{"date":{"value":"2024-11-03"},"time":{"value":"03:18"},"drunk":{"value":0},"water":{"value":"180"},"yo":{"value":"1"},"silgeum":{"value":"Y"},"weird":{"value":"-"},"url":{"value":"-"},"count":{"value":"Y"}}]
  const onClosePopup = () => {
    setIsSavePopup(false);

    const dataJson = {
      date: date1,
      time: timeR,
      drunk: water,
      water: pees,
      yo: yo,
      silgeum: silgeum,
      weird: weird,
      url: url,
      count : "Y",
    };


    const storedData = JSON.parse(localStorage.getItem('data')) || [];
    localStorage.setItem('data', JSON.stringify([...storedData, dataJson]));

    dispatch(setLastInfo({count:"Y", water:pees}));

    dispatch(setUrl("-"));
    dispatch(setWater(0));
    dispatch(setPees(0));
    dispatch(setYo(0));
    dispatch(setSilgeum('N'));
    dispatch(setWeird("-"));
    dispatch(setDate(''));
    dispatch(setTimeRedux(''));
    navigate("/loading");
  };

  const onConfirmPopup = () => {
    setIsSavePopup(false);

    const dataJson = {
      date: date1,
      time: timeR,
      drunk: water,
      water: pees,
      yo: yo,
      silgeum: silgeum,
      weird: weird,
      url: url,
      count : "N",
    };


    const storedData = JSON.parse(localStorage.getItem('data')) || [];
    localStorage.setItem('data', JSON.stringify([...storedData, dataJson]));

    dispatch(setLastInfo({count:"N", water:pees}));

    dispatch(setUrl("-"));
    dispatch(setWater(0));
    dispatch(setPees(0));
    dispatch(setYo(0));
    dispatch(setSilgeum('N'));
    dispatch(setWeird("-"));
    dispatch(setDate(''));
    dispatch(setTimeRedux(''));
    navigate("/loading");
  };


  return (

    <div className="BodyList">

      <DuringNightPopup
        isVisible={isSavePopup}
        onClose={onClosePopup}
        onConfirm={onConfirmPopup}
      />

      <ContainerSpeech
        isVisible={micro.value}
        onClose={SpeechClose}
      />

      {modalQueue.map((element, index) => {
        const Component = componentMap[element]; // element에 맞는 컴포넌트 선택
        return Component ? (
          <div key={`sec-${index}`}>
            {/* Pass date, time, and handlers as props */}
            {React.cloneElement(Component(index), {
              date: date1,
              time: timeR,
              onDateChange: handleDateChange,
              onTimeChange: handleTimeChange,
            })}
          </div>
        ) : null;
      })}

      
      {popup.value && (
                <div className="popup">
                    <div className="TopTitle">
                      <span>직접 설정할 용량 입력하기</span>
                      <div>
                        <FontAwesomeIcon icon={faX} onClick={Close}/>
                      </div>
                    </div>
                    <div className="CustomContainer">
                      <div className="CustomTitle">
                        자주 사용하는 용량 (최대 4개까지 가능)
                      </div>
                      {
                        frequentList.map(e =>
                          <div className="Element">
                            <div className="ItemInElement">
                              <div className="CircleCustom">
                                <FontAwesomeIcon icon={faGlassWater} style={{color:"white", zIndex:"2000"}}/> 
                              </div>
                            </div>
                            <div className="ItemInElement" style={{fontSize: "13px"}}>
                              {e.name}
                            </div>
                            <div className="ItemInElement" style={{fontSize: "13px"}}>
                              {`${e.volume}mL`}
                            </div>
                            <div className="ItemInElement">
                              <input type="checkbox" checked={true} onClick={(i)=>unSelect(i,e)}/>
                            </div>    

                          </div>
                        )
                      }
                    </div>

                    <div className="CustomContainer">
                      <div className="CustomTitle">
                        커스텀 하기
                      </div>
                      {
                        customList.map(e =>
                          <div className="Element">
                            <div className="ItemInElement">
                              <div className="CircleCustom">
                                <FontAwesomeIcon icon={faGlassWater} style={{color:"white", zIndex:"2000"}}/> 
                              </div>
                            </div>
                            <div className="ItemInElement" style={{fontSize: "13px"}}>
                              {e.name}
                            </div>
                            <div className="ItemInElement" style={{fontSize: "13px"}}>
                              {`${e.volume}mL`}
                            </div>
                            <div className="ItemInElement">
                              <input type="checkbox" checked={false} onClick={(i)=>Select(i,e)}/>
                            </div>
                          </div>
                        )
                      }
                    </div>
                    <div className="CustomContainer">
                      <div className="CustomTitle">
                        직접 추가하기
                      </div>
                      <div className="MySelf">
                        <div className="Element2">
                          <div className="item_">
                            명칭
                          </div>
                          <div className="item_">
                              <input className="CustomInput" ref={nameCup}>
                              </input>
                          </div>
                        </div>
                        <div className="Element2">
                          <div className="item_">
                            용량
                          </div>
                          <div className="item_">
                            <input 
                                type="number" 
                                placeholder="ml 입력"
                                className="CustomInput"
                                ref = {ml}
                            />
                          </div>
                          
                        </div>
                        <button className="CustomBtn" onClick={save}>
                          저장
                        </button>
                      </div>

                    </div>
                    
                </div>
            )}
            





      <button className="SaveInfoBtn" onClick={Save}>
        기록 저장하기
      </button>
    </div>
  );
}

export default BodyList;


function DuringNightPopup({ isVisible, onClose, onConfirm }) {
  if (!isVisible) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h4>자정12시 ~ 새벽4시 사이 기록인데 야간 배뇨인가요?</h4>
        <p style={{fontSize:"13px"}}>'예'를 클릭하면 야간 배뇨로 기록됩니다.</p>
        <div className="popup-buttons">
          <button onClick={onClose} className="popup-button cancel">아니오</button>
          <button onClick={onConfirm} className="popup-button confirm">예</button>
        </div>
      </div>
    </div>
  );
}


function ContainerSpeech({isVisible, onClose}){
  //console.log("isVisible:", isVisible);
  const dispatch = useDispatch();
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const weird = useSelector((state) => {
    return state.weird;
  });
  
  useEffect(() => {
    if (isVisible) {
      SpeechRecognition.startListening({ continuous: true });
      resetTranscript();
    } else {
      SpeechRecognition.stopListening();
    }

    // 컴포넌트가 사라질 때 녹음 중지
    return () => {
      SpeechRecognition.stopListening();
    };
  }, [isVisible]);

  const Close = (e) => {

    dispatch(setWeird(transcript));
    onClose();

  }

  const Reset = (e) => {

    dispatch(setWeird("-"));
    resetTranscript();
  }


  if(!isVisible) return null;
  return(
      <div className="SpeechContainer">
        <div class="SpeechHeader">음성 기록</div>
        <div class="SpeechWaveContainer">
            <div class="SpeechWave"></div>
            <div class="SpeechWave"></div>
            <div class="SpeechWave"></div>
            <div class="SpeechWave"></div>
            <div class="SpeechWave"></div>
            <div class="SpeechWave"></div>
        </div>
        <textarea className="inputVoiceText" value={transcript} readOnly />

        <div className="buttonContainer">
          <button className="resetButton" onClick={Reset}>기록 초기화</button>
          <button className="closeButton" onClick={Close}>닫기</button>
        </div>
       
      </div>
  );

}
