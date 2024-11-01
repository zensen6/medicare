import "./List.css";
import React from 'react'
import {useState, useEffect, useRef} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useSelector, useDispatch} from 'react-redux';
import { faWhiskeyGlass, faGlassWater, faBottleWater,  faMicrophone } from "@fortawesome/free-solid-svg-icons";
import {changeState, setDate, setSilgeum, setTimeRedux, setQueue, enqueue, dequeue, setPees, setUrl, setWater, setWeird, setYo, setPopUp, setSelectedList} from "./store";


function List3({ className, date, timeP, onDateChange, onTimeChange }) {

    const inputRef = useRef(null);
    const inputRef2 = useRef(null);
    const divRefs = useRef([]);
  

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

    const date1 = useSelector((state) => state.date);
    const timeR = useSelector((state) => state.time);
    const selectedList = useSelector((state) => state.selectedList);

    const [dateValue, setDateValue] = useState(date1 || ""); // Local state for date input
    const [timeValue, setTimeValue] = useState(timeR || ""); // Local state for time input
    const [value, setValue] = useState(0);  // Initial value for the score slider
    const [popupVisible, setPopupVisible] = useState(false); // 상태 추가: 팝업 가시성


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

    const dispatch = useDispatch();

    const water = useSelector((state) => {
      return state.water;
    });

    const popup = useSelector((state) => {
      return state.popup;
    })

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
        setBtn350(false);
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


    const handleClickN = (e, index, ml) => {
      let t;
      //const targetDiv = divRefs.current[index];
      const targetDiv = e.currentTarget;

      const computedStyle = window.getComputedStyle(targetDiv); // 요소의 스타일을 가져옴
      const backgroundColor = computedStyle.backgroundColor; // 배경색

      if(backgroundColor === "rgb(68, 180, 224)"){ // 안눌렸는데 누른다면
        targetDiv.style.backgroundColor = "rgb(11, 101, 198)";
        t = parseInt(total) + parseInt(ml);
      }else{
        targetDiv.style.backgroundColor = "rgb(68, 180, 224)";
        t = parseInt(total) - parseInt(ml);
      }
      inputRef.current.value = parseInt(total);
      setTotal(t);
      dispatch(setWater(t));
    }

    const setDivRef = (el, index) => {
      divRefs.current[index] = el; // 배열의 특정 인덱스에 ref 설정
    };


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



    useEffect(() => {
      // If date1 is available, set it as the initial value
      if (date1) {
          setDateValue(date1);
        
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
    
    const handlePopupToggle = () => {
      setPopupVisible((prev) => !prev); // 팝업 가시성 토글
    };



    //console.log("selected: ", selectedList);

    return (
      <div className={`List list3 ${className}`}>
        <h5 className="title">
          수분 섭취 기록
        </h5>
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
        <div className="elementBtn" style={{marginTop : '8px'}}>
          <span className="smallTitle">시간</span>

          <input 
            type="time" 
            className="styledDateInput" 

            value={timeR.value} 
            onChange={handleTimeChange} 
            ref={inputRef} 
          />

        </div>



        <div className="elementBtn" style={{marginTop : '8px'}}>
          <span className="smallTitle">섭취량</span>
            <input type="number" className="inputY inputY2" ref={inputRef} value={total} onChange={directInput}/>
          <span className="smallTitle">ml</span>
        </div>

        

        {/*
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

            <div className={`Circle ${btn2l? "Clicked" : ""}`} ref={w2l} onClick={()=>handleClick2l()}>
                <FontAwesomeIcon icon={faBottleWater} style={{color : 'white'}}/> 
                <span style={{color : 'white', fontSize: '6px'}}>
                  2L
                </span>
            </div> 

        </div>
        */}

        {
          selectedList.map((c,index) => {
             if(index % 4 === 0){
              return(
              <div key={index} className="elementBtn" style={{marginTop : '8px'}}>
                <div className={`Circle`} ref={(el) => setDivRef(el, index)} onClick={(el)=>handleClickN(el, index, c.volume)}>
                  <FontAwesomeIcon icon={faGlassWater} style={{color : 'white'}}/> 
                  <span style={{color : 'white', fontSize: '6px'}}>
                    {selectedList[index].volume}
                  </span>
                </div>

                <div key={index+1} className={`Circle`} ref={(el) => setDivRef(el, index+1)} onClick={(el)=>handleClickN(el, index+1, selectedList[index+1].volume)}>
                  <FontAwesomeIcon icon={faGlassWater} style={{color : 'white'}}/> 
                  <span style={{color : 'white', fontSize: '6px'}}>
                    {selectedList[index+1].volume}
                  </span>
                </div>

                <div key={index+2} className={`Circle`} ref={(el) => setDivRef(el, index+2)} onClick={(el)=>handleClickN(el, index+2, selectedList[index+2].volume)}>
                  <FontAwesomeIcon icon={faGlassWater} style={{color : 'white'}}/> 
                  <span style={{color : 'white', fontSize: '6px'}}>
                    {selectedList[index+2].volume}
                  </span>
                </div>

                <div key={index+3} className={`Circle`} ref={(el) => setDivRef(el, index+3)} onClick={(el)=>handleClickN(el, index+3, selectedList[index+3].volume)}>
                  <FontAwesomeIcon icon={faGlassWater} style={{color : 'white'}}/> 
                  <span style={{color : 'white', fontSize: '6px'}}>
                    {selectedList[index+3].volume}
                  </span>
                </div>

              </div>
              );
             } 
             
          })

        }




        <div className="elementDown" style={{marginTop : '8px'}}>
          <button className="CustomBtn" onClick={(e)=>{dispatch(setPopUp(true))}}>
            용량 버튼 설정
          </button>
        </div>
        
      </div>
    );
  }

export default List3