import React from 'react'
import './Intro.css'
import {useRef, useEffect, useState} from 'react'
import json from "../Data/data.json"
import { Bar } from 'react-chartjs-2';
import {useNavigate} from "react-router-dom";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);



function Intro() {

    
    let infoRefs = useRef([]);
    const navigate = useNavigate();
    const [curDate, setCurDate] = useState(new Date());
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
    const [rec, setRec] = useState(0);
    const Now = new Date();
    const NowString = String(curDate.getMonth()+1).padStart(2,'0') + '/' + String(curDate.getDate()).padStart(2,'0');

    const CIC = [
        "도뇨 전에 손을 씻고 소독하는 것이 감염을 예방하는 데 매우 중요합니다.",
        "도뇨관은 일회용을 사용하거나 소독 후 재사용하여 감염을 예방하세요.",
        "특별한 문제가 보이지 않더라도 1년에 1회 방광검사를 하여 방광 내 결석, 요도 손상 등을 점검하는 것이 좋습니다.",
        "도뇨관 삽입에 지속적으로 어려움이 있거나, 삽입 시 출혈이 있을 때는 병원을 방문해야 합니다.",
        "혼탁한 소변이나 색상이 변한 소변은 감염의 징후일 수 있으니 기록 후 의료진과 상담하세요.",
        "발열이나 구토 등의 증상이 있을 경우 즉시 기록하고 병원을 방문하는 것이 좋습니다.",
        "소변에서 불쾌한 냄새가 나거나 배뇨통이 발생할 경우, 관련 기록을 자세히 남기고 증상이 지속되면 의료진과 상의하세요.",
        "방광이 꽉 찼는데 도뇨관 삽입이 안 되며, 두통, 식은땀, 안절부절 하는 등 자율신경과반사 증상이 나타날 때는 응급 상황이므로 즉시 응급실로 갑니다. ",
    ];

    var f = Math.floor(Math.random()*CIC.length);
    var s = (f+1 === CIC.length) ? 0 : f+1;
    

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


    function getMinuteDifference2(dateTime1, dateTime2) {
        // 날짜와 시간 분리
        const [date1, time1] = dateTime1.split(" ");
        const [year1, month1, day1] = date1.split("-").map(Number);
        const [hour1, minute1] = time1.split(":").map(Number);
    
        const [date2, time2] = dateTime2.split(" ");
        const [year2, month2, day2] = date2.split("-").map(Number);
        const [hour2, minute2] = time2.split(":").map(Number);
    
        // 두 Date 객체 생성
        const dateObj1 = new Date(year1, month1 - 1, day1, hour1, minute1);
        const dateObj2 = new Date(year2, month2 - 1, day2, hour2, minute2);
    
        // 두 날짜의 차이 계산 (밀리초를 분 단위로 변환)
        const differenceInMinutes = Math.abs((dateObj2 - dateObj1) / (1000 * 60));
        return differenceInMinutes;
    }

    function addMinutesToTime(time, minutesToAdd) {
        // 시간과 분 분리
        const [hours, minutes] = time.split(":").map(Number);
    
        
        // Date 객체 생성
        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes + minutesToAdd);
    
        // 결과 포맷팅 (2자리 숫자 유지)
        const resultHours = String(date.getHours()).padStart(2, '0');
        const resultMinutes = String(date.getMinutes()).padStart(2, '0');


        return `${resultHours}:${resultMinutes}`;
    }


    useEffect(()=>{

        const datesToCheck = [];
        for (let i = 0; i <= 4; i++) {
            const pastDate = new Date(Now);
            pastDate.setDate(Now.getDate() - i); // i일 전 날짜
            const formattedPastDate = pastDate.toLocaleDateString('en-US', options).replace(/\/0/g, '/');
            datesToCheck.push(formattedPastDate.split('/')[0] + '/' + (formattedPastDate.split('/')[1].length < 2 ? '0'+formattedPastDate.split('/')[1] : formattedPastDate.split('/')[1]));
        }
        datesToCheck.reverse();
        setCalen(datesToCheck);
        let newTotal = 0; // 새로운 총합을 저장할 변수
        let newY = [0, 0, 0, 0, 0]; // 새로운 Y 값을 저장할 배열
        let bn = 0;


        
        for(let i = 0; i < json.length; i++){
            var values = Object.values(json[i]);
            const nowString = values[0];
            bn += parseInt(values[3]);

            if(!datesToCheck.includes(nowString)) continue;
            if(nowString === (String(curDate.getMonth()+1).padStart(2,'0') + '/' + String(curDate.getDate()).padStart(2,'0'))){
                newTotal += parseInt(values[2]);
            }
            for(let j=0;j<5;j++){
                if(datesToCheck[j] === nowString){
                    newY[j] += parseInt(values[5]);
                }
            }
            
        }

        


        const data2 = JSON.parse(localStorage.getItem("data"));

        setLen(json.length + (data2 != null ? data2.length : 0));
/*
        var firstDateTime = `${data2[0]["date"]["value"]} ${data2[0]["time"]["value"]}`;
        var lastDateTime = `${data2[data2.length-1]["date"]["value"]} ${data2[data2.length-1]["time"]["value"]}`;

        if(data2 != null && data2.length > 0){
            
        }
        

        setRec(getMinuteDifference2(firstDateTime, lastDateTime) / Math.max(data2.length, 1));
        */
        //console.log(getMinuteDifference2(firstDateTime, lastDateTime));


        if(data2 != null && data2.length > 0){

            var firstDateTime = `${data2[0]["date"]["value"]} ${data2[0]["time"]["value"]}`;
            var lastDateTime = `${data2[data2.length-1]["date"]["value"]} ${data2[data2.length-1]["time"]["value"]}`;
            var alpha = getMinuteDifference2(firstDateTime, lastDateTime) / Math.max(data2.length, 1);
            if(alpha === 0){
                setRec(0);
            }
            else{
                setRec(addMinutesToTime(data2[data2.length-1]["time"]["value"], alpha));
            }


            for(let i =0; i<data2.length;i++){
                var values = data2[i];
                var selectedDate = values["date"]["value"].substring(5,7) + '/' + values["date"]["value"].substring(8,10);
                bn += parseInt(values["drunk"]["value"]);
                

                //console.log(selectedDate, NowString, selectedDate===NowString, data2.length, datesToCheck);
                if(!datesToCheck.includes(selectedDate)) continue;
                
                
                if(NowString === selectedDate){
                    newTotal += parseInt(values["drunk"]["value"]); // 현재 날짜에 해당하는 water 값 추가
                }
                for(let j=0;j<5;j++){
                    if(datesToCheck[j] === selectedDate){
                        newY[j] += (values["silgeum"]["value"] == 'Y' ? 1 : 0);
                    }
                }
            }
            
        }



        if(data2 != null && data2.length > 0){
            var lastDay = values["date"]?.["value"]?.substring(5,7) + '/' + values["date"]?.["value"]?.substring(8,10);
            var firstIdx = data2.length-1;
            var lastIdx = data2.length-1;
            for(let i =data2.length-1; i>=0;i--){
                //if(data2[lastIdx]?.["time"]?.["value"]?.split(":")[0] < "05"){
                //    continue;
                //}
                lastDay = values["date"]?.["value"]?.substring(5,7) + '/' + values["date"]?.["value"]?.substring(8,10);
                lastIdx = i;
                break;
            }
            //if(lastIdx === 0 && data2[lastIdx]?.["time"]?.["value"]?.split(":")[0] < "05"){
            //    return;
            //}

            firstIdx = lastIdx;
            
            for(let i = lastIdx; i>=0;i--){
                var values = data2[i];
                var dateHere = values["date"]?.["value"]?.substring(5,7) + '/' + values["date"]?.["value"]?.substring(8,10);
                if(lastDay !== dateHere) break;
                //if(data2[i]["time"]?.["value"]?.split(":")[0] < "05"){
                //    break;
                //}
                firstIdx = i;
            }
            //console.log("first:", firstIdx, lastIdx);
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

        //console.log("newTotal:", newTotal);
        //console.log("newY:" , newY);

        setTotal(newTotal); // 총합 업데이트
        setAvg(total / json.length);
        setY(newY); // Y 값 업데이트

    },[]);


    const max = 1500;
    const value = 700;


    const data = {
        labels: calen, // X축 라벨
        datasets: [
            {
                label: '', // 데이터셋의 라벨
                data: Y, // 주어진 데이터
                backgroundColor: '#007BFF', // 막대의 색상
                borderColor: '#007BFF', // 막대의 테두리 색상
                borderWidth: 2, // 테두리 두께
                barThickness: 3,
            },
        ],
    };

    // 옵션 설정
    const options = {
        responsive: true, // 반응형 설정
        plugins: {
            legend: {
                display : false,
            },
            title: {
                display: true,
                text: '', // 차트 제목
            },
        },
        scales: {
            x: {
                ticks: {
                    display: true, // X축 눈금 표시
                },
                grid: {
                    display: false, // Y축 그리드 라인 숨기기 (선택 사항)
                },
            },
            y: {
                ticks: {
                    display: true, // Y축 눈금 표시
                },
                display: false, // Y축 그리드 라인 숨기기 (선택 사항)
                
            },
        },
    };
    
    /*
    const infoRef = useRef(null);
    const infoRef2 = useRef(null);
    const infoRef3 = useRef(null);
    const infoRef4 = useRef(null);
    */




    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');  // Add the visible class when in view
            } else {
              entry.target.classList.remove('visible');  // Remove the class when out of view (optional)
            }
          });
        });

        /*
        const infoElement = infoRef.current;
        const infoElement2 = infoRef2.current;
        const infoElement3 = infoRef3.current;
        */
       /*
        for(let i = 0; i < infoRefs.length; i++){
            observer.observe(infoRefs[i].current);
        }*/
       /*
        if (infoElement) {
            observer.observe(infoElement);  // Start observing the element
        }

        if (infoElement2) {
            observer.observe(infoElement2);  // Start observing the element
        }

        if (infoElement3) {
            observer.observe(infoElement3);  // Start observing the element
        }
        */

        infoRefs.current.forEach(ref => {
            if (ref) {
                observer.observe(ref);
            }
        });
    
        return () => {

            infoRefs.current.forEach(ref => {
                if (ref) {
                    observer.unobserve(ref);
                }
            });
          /*
          if (infoElement) {
            observer.unobserve(infoElement);  // Clean up observer
          }
          if(infoElement2){
            observer.unobserve(infoElement2);
          }

          if(infoElement3){
            observer.unobserve(infoElement3);
          }
            */
        };
      }, []);


    const addToRefs = (el) => {
        if (el && !infoRefs.current.includes(el)) {
            infoRefs.current.push(el); // Push only unique elements to the ref array
        }
    };






    return (
        <div className="Background">

            <div className="Link" onClick={e => navigate("/result")}>
                기록 결과 보기
            </div>

            <div className="InfoHorizontal" ref={addToRefs}>
                <div className="InfoTitle">
                    다음 권장 도뇨 시간은
                </div>

                <div className="InfoContent">
                    {rec === 0 ? "아직 충분한 데이터가 쌓이지 않았습니다." : rec.split(":")[0] + '시' + rec.split(":")[1] + '분'} 
                </div>
            </div>
            <div className="InfoHorizontal" ref={addToRefs}>
                <div className="InfoTitle">
                    평균 1회 배뇨량
                </div>

                <div className="InfoContent">
                    {Math.ceil(baenow / len)} mL
                </div>
            </div>
            <div className="InfoHorizontal2" ref={addToRefs}>
                <div className="InfoTitle">
                    최근 도뇨 주기 분석
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
                        {(lIdx === fIdx && fIdx === 0) ? '-' : Math.ceil((diff / (lIdx - fIdx))*10)/10 + '분'}
                    </div>
                    <div className="GridItem">
                        평균 도뇨 횟수
                    </div>
                    <div className="GridItem">
                        {(lIdx === fIdx && fIdx === 0) ? '0' : `${lIdx - fIdx + 1} 회`}
                    </div>
                </div>
            </div>

            <div className="InfoVerticalBack">
                <div className="InfoVertical" ref={addToRefs}>
                    <div className="InfoTitle">
                        총 수분 섭취량
                    </div>
                    <svg className="progress-ring" width="120" height="120" style={{ position: 'absolute', top: 45, left: 'calc(50% - 60px)' }}>

                        <circle
                            
                            stroke="#ccc"
                            strokeWidth="10"
                            fill="transparent"
                            r="52"
                            cx="60"
                            cy="60"
                            position="absolute"
                            
                            transform="rotate(135 60 60)"

                            strokeDasharray={`${2* Math.PI * 52}`}  // 180도 만큼
    // 8시 방향에서 시작하므로 strokeDashoffset은 전체 길이의 1/4에 해당하는 값으로 설정
                            strokeDashoffset={`${(1/4) * 2 * Math.PI * 52}`}  
                        
                        />
                    </svg>
                    <svg className="progress-ring" width="120" height="120" style={{ position: 'absolute', top: 45, left: 25, left: 'calc(50% - 60px)' }}>

                        <circle
                            
                            stroke={total > max ? "#F2701D":"#007BFF"}
                            strokeWidth="13"
                            fill="transparent"
                            r="52"
                            cx="60"
                            cy="60"
                            strokeLinecap="round" // 테두리 끝을 둥글게 설정

                            transform="rotate(135 60 60)"

                            strokeDasharray={`${2* Math.PI * 52}`}  // 180도 만큼
    // 8시 방향에서 시작하므로 strokeDashoffset은 전체 길이의 1/4에 해당하는 값으로 설정
                            strokeDashoffset={`${(2 * Math.PI * 52) - (3/2)*Math.PI*52*(Math.min(total,max)/max)}`}  
                            style={{ animation: 'draw 2s ease forwards' }}
                        />
                    </svg>
                    <div style={{ marginTop: "50px", fontWeight:"bold"}}>
                        {`${total}mL`}
                    </div>
                    <div style={{ marginTop: "10px", fontSize:"10px"}}>
                        하루 권장 섭취량 
                    </div>
                    <div style={{ marginTop: "3px", fontSize:"10px"}}>
                        1500mL기준 
                    </div>

                    <div style={{ marginTop: "20px", fontSize:"10px", width:"85%", height:"30px", backgroundColor:"#ccc", borderRadius: "10px", display:"flex", justifyContent:"center", alignItems:"center" }}>
                        {
                            total > max ? `권장 섭취량을 넘어섰습니다.`: `약 ${Math.ceil((max - total) / 200)}컵의 물을 더 마셔야 합니다.`
                        }
                    </div>
                    
                    
                
                </div>
                <div className="InfoVertical" ref={addToRefs}>
                    <div className="InfoTitle">
                        실금 발생 횟수
                    </div>
                    <div style={{width:"90%",  height: '300px'}}>
                        <Bar data={data} options={options} style={{width : "100%", height: "100%"}} height={250} />
                    </div>
                </div>
                
            </div>



            <div className="InfoHorizontal" ref={addToRefs}>
                <div className="InfoTitle">
                    CIC 진행시 유의 사항1
                </div>
                <p style={{padding:"15px"}}>
                {CIC[f]}
                </p>
            </div>

            <div className="InfoHorizontal" ref={addToRefs}>
                <div className="InfoTitle">
                    CIC 진행시 유의 사항2
                </div>
                <p style={{padding:"15px"}}>
                {CIC[s]}
                </p>
            </div>
            <button className="SaveInfoBtn" onClick={(e)=>{navigate("/main")}}>
                기록 추가하기
            </button>
        </div>
    )
}

export default Intro