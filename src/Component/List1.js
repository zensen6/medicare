import "./List.css";
import React from 'react'
import {useState, useEffect, useRef} from "react";
import './RangeSlider.css';
import {useSelector, useDispatch} from 'react-redux';
import {changeState, setDate, setSilgeum, setTimeRedux, setQueue, enqueue, dequeue, setPees, setUrl, setWater, setWeird, setYo} from "./store";

function List1({ className }) {


  const inputRef = useRef(null);
  const inputRef2 = useRef(null);

  const yes1 = useSelector((state) => {
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

  const dispatch = useDispatch();
  const globlaQueue = useSelector((state) => {
    return state.queue;
  });


  const handleFocus = () =>{
    if(inputRef.current){
      inputRef.current.focus();
    }
  }

  const handleClear = () =>{
    if(inputRef.current){
      inputRef.current.value = '';
    }
  }

  const handleFocus2 = () =>{
    if(inputRef2.current){
      inputRef2.current.focus();
    }
  }

  const handleClear2 = () =>{
    if(inputRef2.current){
      inputRef2.current.value = '';
    }
  }


  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [time, setTime] = useState("");
  const [timeY, setTimeY] = useState("");
  const [yes, setYes] = useState(false);


  useEffect(() =>{
    const currentDate = new Date();
    setYear(currentDate.getFullYear());
    setMonth(String(currentDate.getMonth()+1).padStart(2,'0'));
    setDay(String(currentDate.getDate()).padStart(2,'0'));
    setHours(String(currentDate.getHours()).padStart(2,'0'));
    setMinutes(String(currentDate.getMinutes()).padStart(2,'0'));


    const currentTime = `${hours}:${minutes}`;
    const currentTimeY = `${year}:${month}:${day}`;


    setTime(currentTime);
    setTimeY(currentTimeY);
    
  },[]);

  const [value, setValue] = useState(0);
  const [value2, setValue2] = useState(0);

  const handleSliderChange = (event) => {
    setValue(parseInt(event.target.value,10));
    inputRef.current.value = parseInt(event.target.value,10);
    dispatch(setYo(event.target.value));
  }

  const handleSliderChange2 = (event) => {
    setValue2(parseInt(event.target.value));
    inputRef2.current.value = parseInt(event.target.value);
    dispatch(setPees(event.target.value));
  }

  const handleYes = (e )=> {
      if(!yes){
        setYes(true);
        dispatch(setSilgeum('Y'));
        dispatch(changeState());
        dispatch(enqueue(2));
      }
  }

  const handleNo = (e )=> {
    if(yes){
      setYes(false);
      dispatch(setSilgeum('N'));
      dispatch(changeState());
      dispatch(enqueue(2));
    }
  }

  const handleDate = (e) => {
    setTimeY(e.target.value);
    dispatch(setDate(e.target.value));
  }

  const handleTime = (e) => {
    setTime(e.target.value);
    dispatch(setTimeRedux(e.target.value));
  }

  const handlePees = (e) => {
    dispatch(setPees(e.target.value));
  }







  return (
    <div className={`List list4 ${className}`}>
      <h5 className="title">
        도뇨 기록
      </h5>
      <div className="elementBtn2">
          <span className="smallTitle smallTime">날짜</span>
          <input type="date" className="styledDateInput" defaultValue={timeY} onChange={handleDate} ref={inputRef2}/>

      </div>

      <div className="elementBtn2">
          <span className="smallTitle smallTime">시간</span>
          <input type="time" className="styledDateInput" defaultValue={time} onChange={handleTime}/>

      </div>




      <div className="elementBtn2">
          <span className="smallTitle" value={0}>배뇨량</span>
          <input type="number" className="inputY inputY2" ref={inputRef2} onChange={handlePees}/>
          <span className="smallTitle">mL</span>
      </div>
      <div className="elementBtn3">
        <input
          type="range"
          min="0"
          max="700"
          step="10"
          value={value2}
          onChange={handleSliderChange2}
          className="slider"
          style={{width: '95%'}}
        />
      </div>
      <div className="elementBtn3" style={{display: "flex", justifyContent:"center"}}>
          <div className="labels" style={{width:"72%"}}>
            <span className={`label ${value2 === 100? 'active':''}`} style={{fontSize:"9px"}}>100</span>
            <span className={`label ${value2 === 200? 'active':''}`} style={{fontSize:"9px"}}>200</span>
            <span className={`label ${value2 === 300? 'active':''}`} style={{fontSize:"9px"}}>300</span>
            <span className={`label ${value2 === 400? 'active':''}`} style={{fontSize:"9px"}}>400</span>
            <span className={`label ${value2 === 500? 'active':''}`} style={{fontSize:"9px"}}>500</span>
            <span className={`label ${value2 === 600? 'active':''}`} style={{fontSize:"9px"}}>600</span>
          </div>
      </div>

      <div className="elementBtn2">
          <span className="smallTitle">실금 발생 여부</span>
          <button onClick={()=> handleYes()} className={`yesButton ${yes ? "ClickedYes" : ""}`}>예</button>
          <button onClick={()=> handleNo()} className={`yesButton ${yes ? "" : "ClickedYes"}`}>아니오</button>
      </div>



      <div className="elementBtn2">
          <span className="smallTitle" value={0}>요절박 점수</span>
          <input type="number" className="inputY inputY2" ref={inputRef}/>
          <span className="smallTitle">점</span>
      </div>
      <div className="elementBtn3">
        <input
          type="range"
          min="0"
          max="3"
          step="1"
          value={value}
          onChange={handleSliderChange}
          className="slider"
          style={{width: '95%'}}
        />
      </div>
      <div className="elementBtn3">
          <div className="labels">
            <span className={`label ${value === 0? 'active':''}`} style={{fontSize:"10px"}}>0</span>
            <span className={`label ${value === 1? 'active':''}`} style={{fontSize:"10px"}}>1</span>
            <span className={`label ${value === 2? 'active':''}`} style={{fontSize:"10px"}}>2</span>
            <span className={`label ${value === 3? 'active':''}`} style={{fontSize:"10px"}}>3</span>
            
          </div>
      </div>
      <div className="elementBtn">
          <div className="labels2">
              <span className={`label labelLeft active2 ${value === 0 ? 'active' : ''}`}>증상없음</span>

              <span className={`label labelRight active2 ${value === 3 ? 'active' : ''}`}>매우 심함</span>
          </div>
      </div>





    </div>
  );
}

export default List1