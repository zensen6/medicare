import "./List.css";
import React from 'react'
import {useState, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import './RangeSlider.css';
import {changeState, setDate, setSilgeum, setTimeRedux, setQueue, enqueue, dequeue, setPees, setUrl, setWater, setWeird, setYo} from "./store";

function List2({ className, date, timeP, onDateChange, onTimeChange }) {

    const dispatch = useDispatch(

    );

    const inputRef = useRef(null);
    const inputRef2 = useRef(null);
    const dateRef = useRef(null);
    const timeRef = useRef(null);

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
  

    const handleFocus = () => {
      if (inputRef.current) {
          inputRef.current.focus();  // input 요소에 포커스
      }
    };

    const handleClear = () => {
        if (inputRef.current) {
            inputRef.current.value = '';  // input 값 초기화
        }
    };

    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");
    const [hours, setHours] = useState("");
    const [minutes, setMinutes] = useState("");
    const [time, setTime] = useState("");
    const [timeY, setTimeY] = useState("");

    

    useEffect(() => {
      const currentDate = new Date();
      setYear(currentDate.getFullYear());
      setMonth(String(currentDate.getMonth() + 1).padStart(2, '0')); // 월은 0부터 시작하므로 +1
      setDay(String(currentDate.getDate()).padStart(2, '0'));
      setHours(String(currentDate.getHours()).padStart(2, '0'));
      setMinutes(String(currentDate.getMinutes()).padStart(2, '0'));

      const currentTime = `${hours}:${minutes}`;
      const currentTimeY = `${year}:${month}:${day}`;
      setTime(currentTime);
      setTime(currentTimeY);
      console.log("list2 date : " + date1.type);

    }, []);


    const [value, setValue] = useState(0);  // 초기값을 0으로 설정

    const handleSliderChange = (event) => {
        setValue(parseInt(event.target.value, 10));  // 슬라이더 값이 변할 때 상태 업데이트
        inputRef.current.value = parseInt(event.target.value,10);
    };

    const handleDate = (e) => {
      const newDate = e.target.value;
      setTimeY(newDate);
      //
      dispatch(setDate(newDate));
      //
      //dispatch(setDate(newDate, time)); // Dispatch both date and time
    };
  
    const handleTime = (e) => {
        const newTime = e.target.value;
        setTime(newTime);
        //
        dispatch(setTimeRedux(newTime));
        //
        //dispatch(setTime(date1, newTime)); // Dispatch both date and time
    };

    


    return (
      <div className={`List silgeum ${className}`}>
        <h5 className="title">
          실금 발생 기록
        </h5>
        <div className="elementBtn">
          <span className="smallTitle">날짜</span>
          {/*
          <input type="date" className="styledDateInput" defaultValue={timeY} onChange={handleDate} ref={dateRef}/>
          */}
          <input type="date" className="styledDateInput" defaultValue={timeY} onChange={handleDate} ref={inputRef2} />

          

        </div>
        <div className="elementBtn">
          <span className="smallTitle smallTime">시간</span>
          {/*
          <input type="time" className="styledDateInput" defaultValue={time} onChange={handleTime} ref={timeRef}/>
          */}
          <input type="time" className="styledDateInput" defaultValue={time} onChange={handleTime} ref={inputRef}/>
        </div>

        <div className="elementBtn">
          <span className="smallTitle" value={0}>요절박 점수</span>
          <input type="number" className="inputY inputY2" ref={inputRef}/>
          <span className="smallTitle">점</span>
        </div>
        <div className="elementBtn3">
          <input
                type="range"
                min="0"
                max="3"
                step="1"  // 슬라이더가 정수 단위로 움직이도록 설정
                value={value}
                onChange={handleSliderChange}
                className="slider"
                style={{width : '95%'}}
          />
        </div>
        <div className="elementBtn3">
          <div className="labels">
                <span className={`label ${value === 0 ? 'active' : ''}`} style={{fontSize:"10px"}}>0</span>
                <span className={`label ${value === 1 ? 'active' : ''}`} style={{fontSize:"10px"}}>1</span>
                <span className={`label ${value === 2 ? 'active' : ''}`} style={{fontSize:"10px"}}>2</span>
                <span className={`label ${value === 3 ? 'active' : ''}`} style={{fontSize:"10px"}}>3</span>
          </div>
        </div>
        <div className="elementBtn">
          <div className="labels2">
               <span className={`label labelLeft active2 ${value === 0 ? 'active' : ''}`}>증상없음</span>

                <span className={`label labelRight active2 ${value === 3 ? 'active' : ''}`}>매우 심함</span>
          </div>
        </div>


        <div className="elementBtn3">
          <span className="smallTitle">상황 기록(선택)</span>
        </div>
        <div className="elementBtn">
          <input className="inputY inputY3" ref={inputRef2}/>
        </div>


      </div>
    );
  }

export default List2