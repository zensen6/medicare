import "./List.css";
import React from 'react'
import {useState, useEffect, useRef} from "react";
import './RangeSlider.css';
import {useSelector, useDispatch} from 'react-redux';
import {changeState, setDate, setSilgeum, setTimeRedux, setQueue, enqueue, dequeue, setPees, setUrl, setWater, setWeird, setYo} from "./store";

function List1({ className, date, timeP, onDateChange, onTimeChange }) {

  const dispatch = useDispatch();

  const date1 = useSelector((state) => state.date);
  const timeR = useSelector((state) => state.time);

  //console.log("timeR:", timeR);
  const [dateValue, setDateValue] = useState(date1 || ""); // Local state for date input
  const [timeValue, setTimeValue] = useState(timeR || ""); // Local state for time input
  
  const today1 = new Date();
  const format = today1.toISOString().split('T')[0];
        

  const inputRef = useRef(null);
  const inputRef2 = useRef(null);

  useEffect(() => {
    // If date1 is available, set it as the initial value
    if (date1) {
        //console.log("list2 effect : ", date1);
        setDateValue(date1);
      
        //console.log("after effect : ", inputRef2.defaultValue);
    } else {
        // 기본 날짜를 오늘로 설정 (예: YYYY-MM-DD 형식)
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        setDateValue(formattedDate);
        dispatch(setDate(formattedDate)); // 초기값으로 오늘 날짜 설정
    }

    // If timeR is available, set it as the initial value
    if (timeR) {
        setTimeValue(timeR);

        //inputRef.
    }
  }, [date1, timeR, dispatch]);


  const yes1 = useSelector((state) => {
    return state.isYes;
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


  useEffect(()=>{
    if(silgeum.value === 'Y'){
      setYes(true);
    }else{
      setYes(false);
    }
  },[silgeum.value])



  useEffect(() =>{
    const currentDate = new Date();
    setYear(currentDate.getFullYear());
    setMonth(String(currentDate.getMonth()+1).padStart(2,'0'));
    setDay(String(currentDate.getDate()).padStart(2,'0'));
    setHours(String(currentDate.getHours()).padStart(2,'0'));
    setMinutes(String(currentDate.getMinutes()).padStart(2,'0'));
    const currentYear = currentDate.getFullYear();
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
    const currentDay = String(currentDate.getDate()).padStart(2, '0');
 


    const currentTime = `${hours}:${minutes}`;
    const currentTimeY = `${currentYear}:${currentMonth}:${currentDay}`;


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
    //(parseInt(event.target.value));
    inputRef2.current.value = parseInt(event.target.value);
    dispatch(setPees(event.target.value));
  }

  const handleYes = (e)=> {
      if(silgeum.value==='N'){
        setYes(true);
        dispatch(setSilgeum('Y'));
        dispatch(changeState());
        dispatch(enqueue(2));
      }
  }

  const handleNo = (e )=> {
    if(silgeum.value==='Y'){
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


  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setDateValue(newDate);
    dispatch(setDate(newDate));
  };

// Handle time change
  const handleTimeChange = (e) => {
      const newTime = e.target.value;
      setTimeValue(newTime);
      dispatch(setTimeRedux(newTime));
  };






  return (
    <div className={`List list4 ${className}`}>
      <h5 className="title">
        도뇨 기록
      </h5>
      <div className="elementBtn2">
          <span className="smallTitle">날짜</span>
          {/*
          <input type="date" className="styledDateInput" defaultValue={timeY} onChange={handleDate} ref={inputRef2}/>
          */}
          <input 
            type="date" 
            className="styledDateInput" 
            defaultValue={new Date().toISOString().slice(0, 7)}
            value={date1.value} 


            onChange={handleDateChange} 
            ref={inputRef2} 
          />
      </div>

      <div className="elementBtn2">
          <span className="smallTitle">시간</span>
          {/*
          <input type="time" className="styledDateInput" defaultValue={time} onChange={handleTime}/>
            */}
          <input 
            type="time" 
            className="styledDateInput" 

            value={timeR.value} 
            onChange={handleTimeChange} 
            ref={inputRef} 
          />

      </div>




      <div className="elementBtn2">
          <span className="smallTitle">배뇨량</span>
          <input type="number" className="inputY inputY2" ref={inputRef2} defaultValue={0} onChange={handlePees} value={pees.value}/>
          <span className="smallTitle">mL</span>
      </div>
      <div className="elementBtn3">
        <input
          type="range"
          min="0"
          max="700"
          step="10"
          //value={value2}
          value={pees.value}
          onChange={handleSliderChange2}
          className="slider"
          style={{width: '95%'}}
        />
      </div>
      <div className="elementBtn3" style={{display: "flex", justifyContent:"center"}}>
          <div className="labels" style={{width:"72%"}}>
            <span className={`label ${pees.value === 100? 'active':''}`} style={{fontSize:"9px"}}>100</span>
            <span className={`label ${pees.value === 200? 'active':''}`} style={{fontSize:"9px"}}>200</span>
            <span className={`label ${pees.value === 300? 'active':''}`} style={{fontSize:"9px"}}>300</span>
            <span className={`label ${pees.value === 400? 'active':''}`} style={{fontSize:"9px"}}>400</span>
            <span className={`label ${pees.value === 500? 'active':''}`} style={{fontSize:"9px"}}>500</span>
            <span className={`label ${pees.value === 600? 'active':''}`} style={{fontSize:"9px"}}>600</span>
          </div>
      </div>

      <div className="elementBtn2">
          <span className="smallTitle">실금 발생 여부</span>
          <button onClick={()=> handleYes()} className={`yesButton ${silgeum.value==='Y' ? "ClickedYes" : ""}`}>예</button>
          <button onClick={()=> handleNo()} className={`yesButton ${silgeum.value==='Y' ? "" : "ClickedYes"}`}>아니오</button>
      </div>



      <div className="elementBtn2">
          <span className="smallTitle" value={0}>요절박 점수</span>
          <input type="number" className="inputY inputY2" ref={inputRef} defaultValue= {0} value={yo.value}/>
          <span className="smallTitle">점</span>
      </div>
      <div className="elementBtn3">
        <input
          type="range"
          min="0"
          max="3"
          step="1"
          value={yo.value}
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