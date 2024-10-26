import "./List.css";
import React, { useState, useEffect, useRef } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {changeState, setDate, setSilgeum, setTimeRedux, setQueue, enqueue, dequeue, setPees, setUrl, setWater, setWeird, setYo} from "./store";
import { openDB } from "idb";
import { v4 as uuidv4 } from 'uuid';

const saveToIndexedDB = async (key, data) => {
    const db = await openDB("ImageDB", 1, {
        upgrade(db) {
            db.createObjectStore("images");
        },
    });
    // key: UUID, data: base64Url
    await db.put("images", data, key);
};

const getFromIndexedDB = async (key) => {
    const db = await openDB("ImageDB", 1);
    return await db.get("images", key);
};


function List4({ className, date, timeP, onDateChange, onTimeChange }) {

    const inputRef = useRef(null);
    const inputRef2 = useRef(null);
    const dispatch = useDispatch();

    const [day, setDay] = useState("");
    const [photo, setPhoto] = useState("");
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [hours, setHours] = useState("");
    const [minutes, setMinutes] = useState("");
    const [time, setTime] = useState("");
    const [timeY, setTimeY] = useState("");
    const date1 = useSelector((state) => state.date);
    const timeR = useSelector((state) => state.time);
  
    const [dateValue, setDateValue] = useState(date1 || ""); // Local state for date input
    const [timeValue, setTimeValue] = useState(timeR || ""); // Local state for time input
    const [value, setValue] = useState(0);  // Initial value for the score slider



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



    // 체크박스 상태 관리
    const [isHontak, setIsHontak] = useState(false);
    const handleHontak = () => setIsHontak(!isHontak);

    const [isCola, setIsCola] = useState(false);
    const handleCola = () => setIsCola(!isCola);

    const [isSmell, setIsSmell] = useState(false);
    const handleSmell = () => setIsSmell(!isSmell);

    const [isSore, setIsSore] = useState(false);
    const handleSore = () => setIsSore(!isSore);

    const [isBelly, setIsBelly] = useState(false);
    const handleBelly = () => setIsBelly(!isBelly);

    const [isObite, setIsObite] = useState(false);
    const handleObite = () => setIsObite(!isObite);

    const [isFever, setIsFever] = useState(false);
    const handleFever = () => setIsFever(!isFever);

    const url = useSelector((state)=>{
        return state.url;
    })


    useEffect(() => {
        const currentDate = new Date();
        setYear(currentDate.getFullYear());
        setMonth(String(currentDate.getMonth() + 1).padStart(2, '0'));
        setDay(String(currentDate.getDate()).padStart(2, '0'));
    }, []);


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

    

    const [source, setSource] = useState("");

    const convertBlobToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };
    
    const handleCapture = async (target) => {
        if (target.files) {
            if (target.files.length !== 0) {
                const file = target.files[0];

                /*
                try {
                    const compressedBase64Url = await compressImage(file);
                    setSource(compressedBase64Url);
                    dispatch(setUrl(compressedBase64Url));
                    localStorage.setItem("imageSource", compressedBase64Url);
                } catch (error) {
                    console.error("Error compressing image:", error);
                }
                */

            
                const base64Url = await convertBlobToBase64(file);
                setSource(base64Url); // Base64 URL을 상태에 저장
                const uniqueId = uuidv4();
                await saveToIndexedDB(uniqueId, base64Url); // Save UUID and base64Url in IndexedDB
                dispatch(setUrl(uniqueId));

                //dispatch(setUrl(base64Url)); // Redux 상태에 저장
                //localStorage.setItem("imageSource", base64Url); // Base64 URL을 LocalStorage에 저장

                

                /*
                const newUrl = URL.createObjectURL(file);
                setSource(newUrl);
                setPhoto(true);
                dispatch(setUrl(newUrl));
                
                localStorage.setItem('imageSource', newUrl);
                */
            }
        }
    };
    

    const triggerFileInput = () => {
        document.getElementById("cameraInput").click();
    };

    return (
        <div className={`List list41 ${className}`}>
            <h5 className="title">이상증세 기록</h5>
            <div className="element">
                <span className="smallTitle">날짜</span>
                <input 
                    type="date" 
                    className="styledDateInput" 


                    value={date1.value} 


                    onChange={handleDateChange} 
                    ref={inputRef2} 
                />

            </div>

            <div className="element">
                <h6 className="smallTitle yangsang">소변의 양상</h6>
            </div>
            <div className="element">
                <span className="smallTitle">혼탁한 색인가요?</span>
                <input
                    type="checkbox"
                    checked={isHontak}
                    onChange={handleHontak}
                />
            </div>

            <div className="element">
                <span className="smallTitle">붉은 색 혹은 콜라색 인가요?</span>
                <input
                    type="checkbox"
                    checked={isCola}
                    onChange={handleCola}
                />
            </div>

            <div className="element">
                <span className="smallTitle">불쾌한 소변냄새가 있나요?</span>
                <input
                    type="checkbox"
                    checked={isSmell}
                    onChange={handleSmell}
                />
            </div>

            <div className="elementCapture">
                <div>
                    <input
                        accept="image/*"
                        id="cameraInput"
                        type="file"
                        capture="environment"
                        style={{ display: 'none' }}
                        onChange={(e) => handleCapture(e.target)}
                    />
                    <button className="capture" onClick={triggerFileInput} style={{ margin: '10px' }}>{photo ? "다시 찍기" : "소변 사진 찍기"}</button>
                </div>
                {source && <img src={source} alt={"snap"} width='50' height='50'></img>}
            </div>


            <div className="element">
                <h6 className="smallTitle yangsang">기타 증상</h6>
            </div>

            <div className="element">
                <span className="smallTitle">배뇨 시 통증이 있나요?</span>
                <input
                    type="checkbox"
                    checked={isSore}
                    onChange={handleSore}
                />
            </div>

            <div className="element">
                <span className="smallTitle">측복부에 통증이 있나요?</span>
                <input
                    type="checkbox"
                    checked={isBelly}
                    onChange={handleBelly}
                />
            </div>

            <div className="element">
                <span className="smallTitle">오심 혹은 구토 증상이 있나요?</span>
                <input
                    type="checkbox"
                    checked={isObite}
                    onChange={handleObite}
                />
            </div>

            <div className="element">
                <span className="smallTitle">발열이 있나요?</span>
                <input
                    type="checkbox"
                    checked={isFever}
                    onChange={handleFever}
                />
            </div>
                 
            

        </div>

    );
}

export default List4;
