import "./Result.css";
import "./Popup.css";
import data from "../Data/data.json";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretLeft, faTrash, faHouse } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

const Result = () => {


    const [isPopupVisibleFirst, setIsPopupVisibleFirst] = useState(false);

    const [curDate, setCurDate] = useState(new Date());
    const [clickCount, setClickCount] = useState(0);
    const [l1, setL] = useState([]);
    const [ll1, setL1] = useState([]);

    const currentDate = new Date();
    const curYear = currentDate.getFullYear();
    const curMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
    const curDay = String(currentDate.getDate()).padStart(2, '0');

    const [month, setMonth] = useState(curMonth);
    const [day, setDay] = useState(curDay);

    const navigate = useNavigate();

    const handleYesterday = (e) => {
        const pivot = curDate;
        const yesterday = new Date(pivot);
        yesterday.setDate(pivot.getDate() -1);
        setCurDate(yesterday);

        setMonth(String(curDate.getMonth()+1).padStart(2,'0'));
        setDay(String(curDate.getDate()).padStart(2,'0'));
        setClickCount(clickCount+1);

    }

    const handleTommorow = (e) => {
        const pivot = curDate;
        const tommorow = new Date(pivot);
        tommorow.setDate(pivot.getDate() + 1);
        setCurDate(tommorow);

        setMonth(String(curDate.getMonth()+1).padStart(2,'0'));
        setDay(String(curDate.getDate()).padStart(2,'0'));
        setClickCount(clickCount+1);

    }

    useEffect(()=>{
        let l=[];
        let l1=[];

        for(let i = 0; i < data.length; i++){
            var values = Object.values(data[i]);
            if(values[0] !== (String(curDate.getMonth()+1).padStart(2,'0') + '/' + String(curDate.getDate()).padStart(2,'0'))) continue;
            for(let j = 1; j < values.length; j++){
                l.push(values[j]);
            }
            //l.push(" ");
        }

        const data2 = JSON.parse(localStorage.getItem("data"));

        let isFirstCount = 0;
        if(data2 != null){
            for(let i =0; i<data2.length;i++){
                var values = data2[i];
                var selectedDate = values["date"]["value"].substring(5,7) + '/' + values["date"]["value"].substring(8,10);
                var Today = (String(curDate.getMonth()+1).padStart(2,'0') + '/' + String(curDate.getDate()).padStart(2,'0'));
                if(selectedDate === Today){
                    isFirstCount += 1;
                }

                if((String(curDate.getMonth()+1).padStart(2,'0') + '/' + String(curDate.getDate()).padStart(2,'0')) !== selectedDate) continue;

                l1.push(values["time"]["value"]);
                l1.push(values["drunk"]["value"]);
                l1.push(values["water"]["value"]);
                l1.push(values["yo"]["value"]);
                l1.push(values["silgeum"]["value"]);

                if(values["weird"]["value"].length){
                    l1.push(values["weird"]["value"]);
                }else{
                    l1.push("-");
                }

                if(values["url"]["value"].length){
                    l1.push(values["url"]["value"]);
                }else{
                    l1.push("-");
                }
                //l1.push(" ");
            }

            console.log("today data :", isFirstCount);
        }
        if(isFirstCount === 1){
            setIsPopupVisibleFirst(true);
        }else if(isFirstCount >= 2){ // 당일 직전 배뇨 기록


        }

        setL(l);
        setL1(l1);
    },[clickCount]);

    const convertTo12HourFormat = (timeString) => {
        const [hours, minutes] = timeString.split(':').map(Number);
        const suffix = hours >= 12 ? 'PM' : 'AM';
        const adjustedHours = hours % 12 || 12;
        return `${adjustedHours}:${minutes.toString().padStart(2, '0')} ${suffix}`;
    };

    const handleDelete = (index) => {
        const updatedL1 = [...l1];
        updatedL1.splice(index, 7); // Remove 8 elements (one full row)
        setL(updatedL1);

        //localStorage.setItem("data",updatedL1);

        const updatedLL1 = [...ll1];
        updatedLL1.splice(index, 7);
        setL1(updatedLL1);

        //localStorage.setItem("data",updatedLL1);
    };

    const goBack = (e) => {
        navigate("/main");
    }
    

    const handleConfirm = () => {
        // 첫 도뇨 확인 로직 추가
        
        setIsPopupVisibleFirst(false);
        navigate("/main");
      };

    return(
        <div className="Result">

            <FirstUrinePopup
                isVisible={isPopupVisibleFirst}
                onClose={() => setIsPopupVisibleFirst(false)}
                onConfirm={handleConfirm}
            />




            <div className="ResultHeader">
                <FontAwesomeIcon icon={faCaretLeft} style={{color: 'black', width: "20px"}} onClick={handleYesterday}/>
                <div className="Date">
                    {
                        String(curDate.getMonth()+1).padStart(2,'0') + '/' + String(curDate.getDate()).padStart(2,'0') + (String(currentDate.getMonth()+1).padStart(2,'0') ===  String(curDate.getMonth() + 1).padStart(2,'0') && String(currentDate.getDate()).padStart(2,'0') === String(curDate.getDate()).padStart(2,'0') ? "(오늘)" : "" )
                    }
                </div>
                <FontAwesomeIcon icon={faCaretRight} style={{color: 'black', width: "20px"}} onClick={handleTommorow}/>
                <FontAwesomeIcon icon={faHouse} style={{position:"fixed", right : "20px", top : "20px"}} onClick={(e)=>{navigate("/")}}/>
            </div>
            <div className="ResultSummary">
                <div className="GrayBlock">
                    <div className="SummaryTitle">
                        도뇨 주기 분석
                    </div>
                </div>
                <div className="GrayBlock">
                    <div className="SummaryTitle">
                        요약
                    </div>
                </div>
            </div>
            <div className="Advice">
                <div className="SummaryTitle2">
                    조언
                </div>

            </div>
            <table className="rwd-table">
                <tbody>
                    <tr>
                        <th>시간</th>
                        <th>수분섭취량(ml)</th>
                        <th>배뇨량(ml)</th>
                        <th>요절박</th>
                        <th>실금</th>
                        <th>이상증세</th>
                        <th>소변사진</th>
                        <th>삭제</th>
                    </tr>
                    
                    {
                        l1.length > 0 ? (
                            l1.map((e, index) => {
                                if (index % 7 === 0) {
                                    const rowItems = l1.slice(index, index + 7);
                                    return (
                                        <tr key={index}>
                                            {rowItems.map((item, subIndex) => {
                                                if (subIndex === 0) {
                                                    return <td key={subIndex}>{convertTo12HourFormat(item)}</td>;
                                                } else {
                                                    return <td key={subIndex}>{item}</td>;
                                                }
                                            })}
                                            <td>
                                                <button onClick={() => handleDelete(index)}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                } else {
                                    return null;
                                }
                            })
                        ) : null
                    }
                    
                    {
                        ll1.length > 0 ? (
                            ll1.map((e, index) => {
                                if (index % 7 === 0) {
                                    const rowItems = ll1.slice(index, index + 7);
                                    return (
                                        <tr key={index}>
                                            {rowItems.map((item, subIndex) => {
                                                if (subIndex === 0) {
                                                    return <td key={subIndex}>{convertTo12HourFormat(item)}</td>;
                                                } else {
                                                    return <td key={subIndex}>{item}</td>;
                                                }
                                            })}
                                            <td>
                                                <button onClick={() => handleDelete(index)}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                } else {
                                    return null;
                                }
                            })
                        ) : null
                    }
                
                </tbody>
            </table>

            <button className="SaveInfoBtn" onClick={goBack}>
                기록 추가하기
            </button>
        </div>
    )
}

export default Result;



function FirstUrinePopup({ isVisible, onClose, onConfirm }) {
    if (!isVisible) return null;
  
    return (
      <div className="popup-overlay">
        <div className="popup-content">
          <h4>오늘의 첫 도뇨인가요?</h4>
          <p style={{fontSize:"13px"}}>오늘 처음 도뇨를 기록하시려면 확인을 눌러주세요.</p>
          <div className="popup-buttons">
            <button onClick={onClose} className="popup-button cancel">아니요</button>
            <button onClick={onConfirm} className="popup-button confirm">확인</button>
          </div>
        </div>
      </div>
    );
  }
