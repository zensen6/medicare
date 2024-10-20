import "./List.css";
import React, { useState, useEffect } from 'react';

function List4({ className, date, timeP, onDateChange, onTimeChange }) {

    const [day, setDay] = useState("");
    const [photo, setPhoto] = useState("");
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [hours, setHours] = useState("");
    const [minutes, setMinutes] = useState("");
    const [time, setTime] = useState("");
    const [timeY, setTimeY] = useState("");


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



    useEffect(() => {
        const currentDate = new Date();
        setYear(currentDate.getFullYear());
        setMonth(String(currentDate.getMonth() + 1).padStart(2, '0'));
        setDay(String(currentDate.getDate()).padStart(2, '0'));
    }, []);

    

    const [source, setSource] = useState("");
    const handleCapture = (target) => {
        if (target.files) {
            if (target.files.length !== 0) {
                const file = target.files[0];
                const newUrl = URL.createObjectURL(file);
                setSource(newUrl);
                setPhoto(true);
                
                localStorage.setItem('imageSource', newUrl);
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
                <input type="date" className="styledDateInput" defaultValue={timeY} onChange={e => setTimeY(e.target.value)}/>

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
