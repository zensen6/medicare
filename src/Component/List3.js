import "./List.css";
import React from 'react'
import {useState, useEffect, useRef} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useSelector, useDispatch} from 'react-redux';
import { faWhiskeyGlass, faGlassWater, faBottleWater } from "@fortawesome/free-solid-svg-icons";
import { setPees, setQueue, setTimeRedux, setUrl, setWater, setWeird } from "./store";
import {changeState, setDate, setSilgeum, setTimeRedux, setQueue, enqueue, dequeue, setPees, setUrl, setWater, setWeird, setYo} from "./store";


function List3({ className }) {

    const inputRef = useRef(null);

    const w200 = useRef(null);
    const w350 = useRef(null);
    const w500 = useRef(null);
    const w2l = useRef(null);

    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");
    const [hours, setHours] = useState("");
    const [minutes, setMinutes] = useState("");
    const [time, setTime] = useState("");
    const [timeY, setTimeY] = useState("");
    const [btn200, setBtn200] = useState(false);
    const [btn350, setBtn350] = useState(false);
    const [btn500, setBtn500] = useState(false);
    const [btn2l, setBtn2l] = useState(false);
    const [total, setTotal] = useState(0);
    const [direct, setDirect] = useState(false);

    useEffect(() =>{
      const currentDate = new Date();
      setYear(currentDate.getFullYear());
      setMonth(String(currentDate.getMonth()+1).padState(2,'0'));
      setDay(String(currentDate.getDate()).padState(2,'0'));
      setHours(String(currentDate.getHours()).padState(2,'0'));
      setMinutes(String(currentDate.getMinutes()).padState(2,'0'));
  
  
      const currentTime = `${hours}:${minutes}`;
      const currentTimeY = `${year}:${month}:${day}`;
  
  
      setTime(currentTime);
      setTimeY(currentTimeY);
      
    },[]);

    const dispatch = useDispatch();

    const water = useSelector((state) => {
      return state.water;
    });

    const handleClick200 = (e) => {
      let t;
      if(!btn200){
        setBtn200(true);
        t = parseInt(total) + 200;
        setTotal(parseInt(total) + 200);
      }else{
        setBtn200(false);
        t = parseInt(total) - 200;
        setTotal(parseInt(total) - 200);
      }
      inputRef.value = total;
      dispatch(setWater(total));
      dispatch(setWater(t));
    }

    const handleClick350 = (e) => {
      let t;
      if(!btn350){
        setBtn350(true);
        t = parseInt(total) + 350;
        setTotal(parseInt(total) + 350);
      }else{
        setBtn200(false);
        t = parseInt(total) - 350;
        setTotal(parseInt(total) - 350);
      }
      inputRef.value = total;
      dispatch(setWater(total));
      dispatch(setWater(t));
    }


    const handleClick500 = (e) => {
      let t;
      if(!btn500){
        setBtn500(true);
        t = parseInt(total) + 500;
        setTotal(parseInt(total) + 500);
      }else{
        setBtn500(false);
        t = parseInt(total) - 500;
        setTotal(parseInt(total) - 500);
      }
      inputRef.value = total;
      dispatch(setWater(total));
      dispatch(setWater(t));
    }

    const handleClick2l = (e) => {
      let t;
      if(!btn2l){
        setBtn2l(true);
        t = parseInt(total) + 2000;
        setTotal(parseInt(total) + 2000);
      }else{
        setBtn2l(false);
        t = parseInt(total) - 2000;
        setTotal(parseInt(total) - 2000);
      }
      inputRef.value = total;
      dispatch(setWater(t));
    }


    const directInput = (e) => {
      setTotal(e.target.value);
      setDirect(true);
      if(total == 0){
        setDirect(false);
      }
      setBtn200(false);
      setBtn350(false);
      setBtn500(false);
      setBtn2l(false);

      dispatch(setWater(e.target.value));
    }






    return (
      <div className={`List list3 ${className}`}>
        <h5 className="title">
          수분 섭취 기록
        </h5>
        <div className="elementBtn">
          <span className="smallTitle">날짜</span>
          <input type="date" defaultValue={timeY} onChange={(e) => setTimeY(e.target.value)} />
        </div>
        <div className="elementBtn" style={{marginTop : '8px'}}>
          <span className="smallTitle smallTime">시간</span>

          <input type="time" defaultValue={time} onChange={(e) => setTime(e.target.value)}/>

        </div>



        <div className="elementBtn" style={{marginTop : '8px'}}>
          <span className="smallTitle">섭취량</span>
            <input type="number" className="inputY inputY2" ref={inputRef} value={total} onChange={directInput}/>
          <span className="smallTitle">ml</span>
        </div>

        <div className="elementBtn" style={{marginTop : '8px'}}>
            <div className={`Circle ${btn200? "Clicked" : ""}`} ref={w200} onClick={()=>handleClick200()}>
                <FontAwesomeIcon icon={faWhiskeyGlass} style={{color : 'white'}}/> 
                <span style={{color : 'white', fontSize: '6px'}}>
                  200mL
                </span>
            </div>  

            <div className={`Circle ${btn350? "Clicked" : ""}`} ref={w350} onClick={()=>handleClick350()}>
                <FontAwesomeIcon icon={faGlassWater} style={{color : 'white'}}/> 
                <span style={{color : 'white', fontSize: '6px'}}>
                  350mL
                </span>
            </div> 

            <div className={`Circle ${btn500? "Clicked" : ""}`} ref={w500} onClick={()=>handleClick500()}>
                <FontAwesomeIcon icon={faBottleWater} style={{color : 'white'}}/> 
                <span style={{color : 'white', fontSize: '6px'}}>
                  500mL
                </span>
            </div> 

            <div className={`Circle ${btn2l? "Clicked" : ""}`} ref={w2l} onClick={()=>handleClick500()}>
                <FontAwesomeIcon icon={faBottleWater} style={{color : 'white'}}/> 
                <span style={{color : 'white', fontSize: '6px'}}>
                  2L
                </span>
            </div> 

        </div>
      </div>
    );
  }

export default List3