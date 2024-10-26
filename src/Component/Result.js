import "./Result.css";
import "./Popup.css";
import data from "../Data/data.json";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import json from "../Data/data.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setUrl } from './store';
import { faCaretRight, faCaretLeft, faTrash, faHouse } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useSelector } from "react-redux";

const Result = () => {


    const [isPopupVisibleFirst, setIsPopupVisibleFirst] = useState(false);
    const [isPopupVisible6, setIsPopupVisible6] = useState(false);

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

    const [total, setTotal] = useState(0);
    const [baenow, setBaenow] = useState(0);
    const [Y, setY] = useState([0, 0, 0, 0, 0]); // Y 값을 상태로 관리
    const [calen, setCalen] = useState([0,0,0,0,0]);
    const [avg, setAvg] = useState(0);
    const [len, setLen] = useState(0);
    const [diff, setDiff] = useState(0);
    const [firstS, setFirstS] = useState("-");
    const [lastS, setLastS] = useState("-");
    const [fIdx, setFIdx] = useState(0);
    const [lIdx, setLIdx] = useState(0);
    const [freq, setFreq] = useState("-");
    const [source, setSource] = useState("");
    const Now = new Date();
    const NowString = String(curDate.getMonth()+1).padStart(2,'0') + '/' + String(curDate.getDate()).padStart(2,'0');


    /*
    const url = useSelector((state) => {
        return state.url;
    })
    */

    function getMinuteDifference(time1, time2) {
        // 시간과 분을 분리 (예: "08:11" => ["08", "11"])
        const [hours1, minutes1] = time1.split(":").map(Number);
        const [hours2, minutes2] = time2.split(":").map(Number);
        
        // 총 분 계산
        const totalMinutes1 = hours1 * 60 + minutes1;
        const totalMinutes2 = hours2 * 60 + minutes2;
        
        // 분 차이 계산
        return Math.abs(totalMinutes1 - totalMinutes2);
    }


    useEffect(()=>{

        //source
        const source = localStorage.getItem("imageSource");
        console.log(source);

        const datesToCheck = [];
        for (let i = 0; i <= 4; i++) {
            const pastDate = new Date(Now);
            pastDate.setDate(Now.getDate() - i); // i일 전 날짜
        }
        let bn = 0;
        let newTotal = 0; // 새로운 총합을 저장할 변수
        let newY = [0, 0, 0, 0, 0]; // 새로운 Y 값을 저장할 배열
     
        for(let i = 0; i < json.length; i++){
            var values = Object.values(json[i]);
            const nowString = values[0];
            bn += parseInt(values[3]);

            if(!datesToCheck.includes(nowString)) continue;
            if(nowString === (String(curDate.getMonth()+1).padStart(2,'0') + '/' + String(curDate.getDate()).padStart(2,'0'))){
                newTotal += parseInt(values[2]);
            }
            
        }

        


        const data2 = JSON.parse(localStorage.getItem("data"));

        setLen(json.length + (data2 != null ? data2.length : 0));

        if(data2 != null && data2.length > 0){
            for(let i =0; i<data2.length;i++){
                var values = data2[i];
                var selectedDate = values["date"]["value"].substring(5,7) + '/' + values["date"]["value"].substring(8,10);
                bn += parseInt(values["drunk"]["value"]);

                if(!datesToCheck.includes(selectedDate)) continue;
                if(NowString === selectedDate) newTotal += parseInt(values["drunk"]["value"]); // 현재 날짜에 해당하는 water 값 추가
                for(let j=0;j<5;j++){
                    if(datesToCheck[j] === selectedDate){
                        newY[j] += (values["silgeum"]["value"] == 'Y' ? 1 : 0);
                    }
                }
            }
            
        }



        if(data2 != null && data2.length > 0){
            console.log("not empty");
            var lastDay = values["date"]?.["value"]?.substring(5,7) + '/' + values["date"]?.["value"]?.substring(8,10);
            var firstIdx = data2.length-1;
            var lastIdx = data2.length-1;
            for(let i =data2.length-1; i>=0;i--){
                if(data2[lastIdx]?.["time"]?.["value"]?.split(":")[0] < "05"){
                    continue;
                }
                lastDay = values["date"]?.["value"]?.substring(5,7) + '/' + values["date"]?.["value"]?.substring(8,10);
                lastIdx = i;
                break;
            }
            if(lastIdx === 0 && data2[lastIdx]?.["time"]?.["value"]?.split(":")[0] < "05"){
                return;
            }


            firstIdx = lastIdx;
            
            for(let i = lastIdx; i>=0;i--){
                var values = data2[i];
                var dateHere = values["date"]?.["value"]?.substring(5,7) + '/' + values["date"]?.["value"]?.substring(8,10);
                if(lastDay !== dateHere) break;
                if(data2[i]["time"]?.["value"]?.split(":")[0] < "05"){
                    break;
                }
                firstIdx = i;
            }
            var first = data2[firstIdx]?.["time"]?.["value"];
            var last = data2[lastIdx]?.["time"]?.["value"];
            
            setDiff(getMinuteDifference(first, last));

            if(first.split(":")[0] < "12"){
                setFirstS("오전 " + `${parseInt(first.split(":")[0])}` + '시 ' + first.split(":")[1] + '분');
            }else{
                setFirstS("오후 " + `${parseInt(first.split(":")[0]) - 12}` + '시 ' + first.split(":")[1] + '분');
            }

            if(last.split(":")[0] < "12"){
                setLastS("오전 " + `${parseInt(last.split(":")[0])}` + '시 ' + last.split(":")[1] + '분');
            }else{
                setLastS("오후 " + `${parseInt(last.split(":")[0]) - 12}` + '시 ' + last.split(":")[1] + '분');
            }

            setFIdx(firstIdx);
            setLIdx(lastIdx);
            
        }

        setBaenow(bn);

        setTotal(newTotal); // 총합 업데이트
        setAvg(total / json.length);
        setY(newY); // Y 값 업데이트

    },[]);


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
        let is6 = false;
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
            var lastIdx = data2.length-1;
            var secIdx = data2.length-2;
            var valuesLast = data2[lastIdx];
            var valuesSec = data2[secIdx];

            var diff = getMinuteDifference(valuesLast["time"]["value"], valuesSec["time"]["value"]);
            if(diff >= 360){
                setIsPopupVisible6(true);
            }

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

        const dataFromStorage = JSON.parse(localStorage.getItem("data")) || [];
        const dataIndex = Math.floor(index / 7); // 각 행은 7개의 항목으로 구성되어 있으므로 인덱스를 계산
        dataFromStorage.splice(dataIndex, 1); // 해당 인덱스의 객체 삭제
        localStorage.setItem("data", JSON.stringify(dataFromStorage));

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



    const handleAutomatic = () => {

        const data2 = JSON.parse(localStorage.getItem("data"));
        var lastIdx = data2.length-1;
        var secIdx = data2.length-2;
        var valuesLast = data2[lastIdx];
        var valuesSec = data2[secIdx];
        var mediumTime = getMinutesLater(valuesLast["time"]["value"], valuesSec["time"]["value"]);

        var LastWater = data2[lastIdx]["water"]["value"];
        var SecWater =  data2[secIdx]["water"]["value"];
        var mediumWater = Math.ceil((parseInt(LastWater) + parseInt(SecWater)) / 2);
        var Today = (curYear + "-" + String(curDate.getMonth()+1).padStart(2,'0') + '-' + String(curDate.getDate()).padStart(2,'0'));
//[{"date":{"value":"2024-10-25"},"time":{"value":"14:39"},"drunk":{"value":350},"water":{"value":"360"},"yo":{"value":"1"},"silgeum":{"value":"Y"},"weird":{"value":""},"url":{"value":""}},{"date":{"value":"10/25"},"time":{"value":"02:39"},"drunk":{"value":225},"water":{"value":"0"},"yo":{"value":"0"},"silgeum":{"value":"N"},"weird":{"value":"-"},"url":{"value":"-"}},{"date":{"value":"2024-10-25"},"time":{"value":"22:39"},"drunk":{"value":200},"water":{"value":"90"},"yo":{"value":"1"},"silgeum":{"value":"Y"},"weird":{"value":""},"url":{"value":""}}]
        const dataJson = {
            date: { value: Today },
            time: { value: mediumTime },
            drunk: { value: 0 },
            water: { value: `${mediumWater}` },
            yo: { value: "0" },
            silgeum: { value: "N" },
            weird: { value: "" },
            url: { value: "" }
        };

        // localStorage에 업데이트
        const jsonData = JSON.parse(localStorage.getItem("data")) || [];
        jsonData.splice(jsonData.length - 1, 0, dataJson);
        localStorage.setItem("data", JSON.stringify(jsonData));


        const updatedData = JSON.parse(localStorage.getItem("data"));
        const newL1 = [];
        updatedData.forEach((entry) => {
            newL1.push(
                entry.time.value,
                entry.drunk.value,
                entry.water.value,
                entry.yo.value,
                entry.silgeum.value,
                entry.weird.value || "-",
                entry.url.value || "-"
            );
        });
    
        setL1(newL1);


        setIsPopupVisible6(false);

        //const newL1 = [...l1];
        //newL1.splice(newL1.length - 7, 0, mediumTime, "0", mediumWater, "0", "N", "-", "-");
        //setL1(newL1);

    }

    const onClose6 = () =>{
        setIsPopupVisible6(false);
    }

    const onConfirm6 = () =>{
        setIsPopupVisible6(false);
        navigate("/main");
    }

    

    return(
        <div className="Result">

            <FirstUrinePopup
                isVisible={isPopupVisibleFirst}
                onClose={() => setIsPopupVisibleFirst(false)}
                onConfirm={handleConfirm}
            />

            <SixHoursPopup
                isVisible={isPopupVisible6}
                onClose={onClose6}
                onConfirm={onConfirm6}
                onAutomatic={handleAutomatic}
            />



            <div className="ResultHeader">
                <FontAwesomeIcon icon={faCaretLeft} style={{color: 'black', width: "20px"}} onClick={handleYesterday}/>
                <div className="Date">
                    {
                        String(curDate.getMonth()+1).padStart(2,'0') + '/' + String(curDate.getDate()).padStart(2,'0') + (String(currentDate.getMonth()+1).padStart(2,'0') ===  String(curDate.getMonth() + 1).padStart(2,'0') && String(currentDate.getDate()).padStart(2,'0') === String(curDate.getDate()).padStart(2,'0') ? "(오늘)" : "" )
                    }
                </div>
                <FontAwesomeIcon icon={faCaretRight} style={{color: 'black', width: "20px"}} onClick={handleTommorow}/>
                <FontAwesomeIcon icon={faHouse} style={{position:"absolute", right : "20px", top : "20px"}} onClick={(e)=>{navigate("/")}}/>
            </div>
            <div className="ResultSummary">
                <div className="GrayBlock">
                    <div className="SummaryTitle">
                        도뇨 주기 분석
                    </div>
                    <div className="grid">
                    <div className="GridItem">
                            첫 도뇨 시간
                        </div>
                        <div className="GridItem" style={{textAlign: "right"}}>
                            {firstS}
                        </div>
                        <div className="GridItem">
                            마지막 도뇨 시간
                        </div>
                        <div className="GridItem">
                            {lastS}
                        </div>
                        <div className="GridItem">
                            평균 도뇨 주기
                        </div>
                        <div className="GridItem">
                            {(lIdx === fIdx && fIdx === 0) ? '-' : Math.ceil((diff / (lIdx - fIdx + 1))*10)/10 + '분'}
                        </div>
                        <div className="GridItem">
                            평균 도뇨 횟수
                        </div>
                        <div className="GridItem">
                            {(lIdx === fIdx && fIdx === 0) ? '-' : `${lIdx - fIdx + 1} 회`}
                        </div>

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
                                                } 
                                                else if(subIndex === 6 && item){
                                                    return <td key={subIndex}><img src={item} alt={"snap"} width='20' height='20'></img></td>    
                                                }
                                                else {
                                                    return<td key={subIndex}>{item}</td>;
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

                                                if(subIndex === 6){
                                                    console.log("item", item);
                                                }

                                                if (subIndex === 0) {
                                                    return <td key={subIndex}>{convertTo12HourFormat(item)}</td>;
                                                } 
                                                else if(subIndex === 6 && item){
                                                    return <td key={subIndex}><img src={item} alt={"snap"} width='20' height='20'></img></td>    
                                                }
                                                else {
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


function SixHoursPopup({ isVisible, onClose, onConfirm, onAutomatic }) {
    if (!isVisible) return null;
  
    return (
      <div className="popup-overlay2">
        <div className="popup-content">
          <h4>중간에 도뇨 기록을 빠뜨리셨나요?</h4>
          <p style={{fontSize:"13px"}}>직접 기록하시려면 도뇨 기록 추가, 특이 사항 없으시다면 기록 자동 생성 자동을 눌러주세요.</p>
          <div className="popup-buttons2">
            <button onClick={onClose} className="popup-button cancel2">아니요</button>
            <button onClick={onConfirm} className="popup-button confirm2">도뇨 기록 추가하기</button>
            <button onClick={onAutomatic} className="popup-button confirm2">기록 자동 생성하기</button>
          </div>
        </div>
      </div>
    );
  }


  function getMinuteDifference(time1, time2) {
    // 시간과 분을 분리 (예: "08:11" => ["08", "11"])
    const [hours1, minutes1] = time1.split(":").map(Number);
    const [hours2, minutes2] = time2.split(":").map(Number);
    
    // 총 분 계산
    const totalMinutes1 = hours1 * 60 + minutes1;
    const totalMinutes2 = hours2 * 60 + minutes2;
    
    // 분 차이 계산
    return Math.abs(totalMinutes1 - totalMinutes2);
}

function getMinutesLater(time1, time2) {
    // Parse hours and minutes for each time
    const [hours1, minutes1] = time1.split(":").map(Number);
    const [hours2, minutes2] = time2.split(":").map(Number);
    
    // Convert both times to total minutes
    const totalMinutes1 = hours1 * 60 + minutes1;
    const totalMinutes2 = hours2 * 60 + minutes2;

    // Identify the earlier time and calculate the time difference
    const earlier = Math.min(totalMinutes1, totalMinutes2);
    const difference = Math.abs(totalMinutes1 - totalMinutes2);

    // Calculate the midpoint in minutes
    const midpointMinutes = earlier + Math.floor(difference / 2);

    // Convert midpoint back to hours and minutes
    const resultHours = Math.floor(midpointMinutes / 60) % 24;  // 24-hour format
    const resultMinutes = midpointMinutes % 60;

    // Format the time to "HH:MM"
    return `${resultHours.toString().padStart(2, '0')}:${resultMinutes.toString().padStart(2, '0')}`;
}

  //[{"date":{"value":"2024-10-25"},"time":{"value":"14:52"},"drunk":{"value":2000},"water":{"value":"470"},"yo":{"value":0},"silgeum":{"value":"N"},"weird":{"value":""},"url":{"value":""}},{"date":"10/25","time":"25.366666666666667:22","drunk":250,"water":0,"yo":0,"silgeum":"N","weird":"-","url":"-"},{"date":{"value":"2024-10-25"},"time":{"value":"21:52"},"drunk":{"value":350},"water":{"value":"30"},"yo":{"value":0},"silgeum":{"value":"N"},"weird":{"value":""},"url":{"value":""}}]