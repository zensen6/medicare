import "./List.css";
import React from 'react'
import {useState, useEffect} from "react";

function List2({ className }) {

    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");
    const [hours, setHours] = useState("");
    const [minutes, setMinutes] = useState("");
    const [time, setTime] = useState("");

    useEffect(() => {
      const currentDate = new Date();
      setYear(currentDate.getFullYear());
      setMonth(String(currentDate.getMonth() + 1).padStart(2, '0')); // 월은 0부터 시작하므로 +1
      setDay(String(currentDate.getDate()).padStart(2, '0'));
      setHours(String(currentDate.getHours()).padStart(2, '0'));
      setMinutes(String(currentDate.getMinutes()).padStart(2, '0'));

      const currentTime = `${hours}:${minutes}`;
      setTime(currentTime);

    }, []);


    return (
      <div className={`List silgeum ${className}`}>
        <h5 className="title">
          실금 발생 기록
        </h5>
        <div className="element">
          <span className="smallTitle">날짜</span>
          <input type="number" className="inputY" min="1900" max="2100" value={year} />
          <span className="smallTitle">년</span>
          <input type="number" className="inputY" min="1" max="12" value={month}/>
          <span className="smallTitle">월</span>
          <input type="number" className="inputY" min="1" max="31" value={day}/>
          <span className="smallTitle">일</span>
        </div>
        <div className="element">
          <span className="smallTitle smallTime">시간</span>

          <input type="time" defaultValue={time} onChange={(e) => setTime(e.target.value)}/>

        </div>
      </div>
    );
  }

export default List2