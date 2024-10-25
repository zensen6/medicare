import "./BodyList.css";
import React from 'react';
import List1 from "./List1";
import List2 from "./List2";
import List3 from "./List3";
import List4 from "./List4";
import './List.css';
import data from "../Data/data.json";
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from "react-router-dom";
import {useRef, useEffect} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faWhiskeyGlass, faGlassWater, faBottleWater, faX } from "@fortawesome/free-solid-svg-icons";
import {changeState, setDate, setSilgeum, setTimeRedux, setQueue, enqueue, setPees, setUrl, setWater, setWeird, setYo, setPopUp, setFrequentList, setCustomList, setSelectedList} from "./store";


function BodyList(props) {

  useEffect(() => {
    // 페이지 로드 시 화면을 맨 위로 이동
    window.scrollTo(0, 0);
  }, []); 


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nameCup = useRef();
  const ml = useRef();

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

  console.log("popup", popup);


  const Save = (e) => {
    const dataJson = {
      date : date1,
      time : timeR,
      drunk : water,
      water : pees,
      yo : yo,
      silgeum : silgeum,
      weird : weird,
      url : url
    }
    if(localStorage.getItem('data')){
      localStorage.setItem('data', JSON.stringify([...JSON.parse(localStorage.getItem('data')), dataJson]));
    }else{
      localStorage.setItem('data', JSON.stringify([dataJson]));
    }
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

    console.log("aaaa:", nameCup.current.value);
    dispatch(setCustomList([...customList,{name:nameCup.current.value, volume:ml.current.value}]));

    dispatch(setSelectedList(frequentList));
  }) 

  const Close = (e => {
    dispatch(setSelectedList(frequentList));
    dispatch(setPopUp(false));
  })

  return (
    <div className="BodyList">
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
                          <div className="item">
                            명칭
                          </div>
                          <div className="item">
                              <input className="CustomInput" ref={nameCup}>
                              </input>
                          </div>
                        </div>
                        <div className="Element2">
                          <div className="item">
                            용량
                          </div>
                          <div className="item">
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
