import "./List.css";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './RangeSlider.css';
import { setDate, setTimeRedux } from "./store";

function List2({ className }) {
    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const inputRef2 = useRef(null);

    const date1 = useSelector((state) => state.date);
    const timeR = useSelector((state) => state.time);
  
    const [dateValue, setDateValue] = useState(date1 || ""); // Local state for date input
    const [timeValue, setTimeValue] = useState(timeR || ""); // Local state for time input
    const [value, setValue] = useState(0);  // Initial value for the score slider

    const yo = useSelector((state) => {
      return state.yo;
    });
    // Update local state on mount
    useEffect(() => {
      // If date1 is available, set it as the initial value
      if (date1) {
          console.log("list2 effect : ", date1);
          setDateValue(date1);
        
          console.log("after effect : ", inputRef2.defaultValue);
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

    // Handle date change
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

    const handleSliderChange = (event) => {
        setValue(parseInt(event.target.value, 10));
    };

    return (
      <div className={`List silgeum ${className}`}>
        <h5 className="title">실금 발생 기록</h5>
        <div className="elementBtn">
          <span className="smallTitle">날짜</span>
          <input 
            type="date" 
            className="styledDateInput" 


            value={date1.value} 


            onChange={handleDateChange} 
            ref={inputRef2} 
          />
        </div>
        <div className="elementBtn">
          <span className="smallTitle smallTime">시간</span>
          <input 
            type="time" 
            className="styledDateInput" 

            value={timeR.value} 
            onChange={handleTimeChange} 
            ref={inputRef} 
          />
        </div>
        <div className="elementBtn">
          <span className="smallTitle">요절박 점수</span>
          <input type="number" className="inputY inputY2" defaultValue={0} value={yo.value} />
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
            <span className={`label ${value === 0 ? 'active' : ''}`} style={{fontSize: "10px"}}>0</span>
            <span className={`label ${value === 1 ? 'active' : ''}`} style={{fontSize: "10px"}}>1</span>
            <span className={`label ${value === 2 ? 'active' : ''}`} style={{fontSize: "10px"}}>2</span>
            <span className={`label ${value === 3 ? 'active' : ''}`} style={{fontSize: "10px"}}>3</span>
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
          <input className="inputY inputY3" />
        </div>
      </div>
    );
}

export default List2;
