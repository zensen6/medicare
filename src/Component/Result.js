import "./Result.css";
import "./Popup.css";
import data from "../Data/data.json";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import json from "../Data/data.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setUrl, setLastInfo } from './store';
import { faCaretRight, faCaretLeft, faTrash, faHouse, faX } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useSelector, useDispatch } from "react-redux";
import { openDB } from 'idb';
import { v4 as uuidv4 } from 'uuid';

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
    const [totalWater, setTotalWater] = useState(0);
    const [maxBae, setMaxBae] = useState(0);
    const [avgBae, setAvgBae] = useState(0);
    const [yo, setYo] = useState(0);
    const [silgeum, setSilgeum] = useState(0);

    const [avg, setAvg] = useState(0);
    const [len, setLen] = useState(0);
    const [diff, setDiff] = useState(0);
    const [firstS, setFirstS] = useState("-");
    const [lastS, setLastS] = useState("-");
    const [fIdx, setFIdx] = useState(0);
    const [lIdx, setLIdx] = useState(0);
    const [freq, setFreq] = useState("-");
    const [source, setSource] = useState("");
    const [visiblePicture, setVisiblePicture] = useState("");
    const [popupFreq, setPopupFreq] = useState(false);
    const [rec, setRec] = useState(0);
    const [BaenowCount, setBaenowCount] = useState(0);
    const [Tommorow, setTommorow] = useState("");

    const Now = new Date();
    const NowString = String(curDate.getMonth()+1).padStart(2,'0') + '/' + String(curDate.getDate()).padStart(2,'0');

    const dispatch = useDispatch();
    const url = useSelector((state) => {
        return state.url;
    })

    const lastInfo = useSelector((state) => {
        return state.lastInfo;
    })

    const Advice = [
        "수분 섭취량이 부족하면 요로 감염, 신장 결석의 위험이 높아집니다.",
        "평균 배뇨량이 400ml를 초과할 경우, 방광 압력이 높아져 요로 감염 및 방광 기능 저하의 위험이 있습니다. 정상적인 방광 용적을 초과하는 경우 방광벽에 무리가 갈 수 있으며, 배뇨 주기를 조절하여 방광 건강을 유지하는 것이 좋습니다.",
        "일일 최고 배뇨량이 500ml 이상일 경우, 이는 방광에 과도한 부담을 줄 수 있으며 신장 역류 또는 신장 손상으로 이어질 위험이 있습니다. 신장 건강을 위해 배뇨 주기를 줄이고 적절한 배뇨량을 유지하는 것이 권장됩니다.",
    ];

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

    const isToday = (date1, time, pivot) => { // 앞의 두개는 localData의 각 행, 이걸 지금 헤더에 나타난 날짜에 포함시킬까를 나타냄
        //"11/03"     "01:01"    "11/02"
        const [month, day] = pivot.split("/").map(Number); // Split and convert to numbers
        const date = new Date(0, month - 1, day); // Use a base date without a specific year

        date.setDate(date.getDate() + 1); // Move to the next day

        // Format month and day to always be two digits
        const nextMonth = String(date.getMonth() + 1).padStart(2, "0");
        const nextDay = String(date.getDate()).padStart(2, "0");

        //console.log(date1, time, pivot, (nextMonth + "/" + nextDay), time.split(":")[0] <= "03");


        if((date1 === pivot && (time.split(":")[0] >= "04"))) return true;
        if((nextMonth + "/" + nextDay) === (date1) && (time.split(":")[0] <= "03")) return true;
        return false;
        //if(())
    }



    const update = () => {
        const data2 = JSON.parse(localStorage.getItem("data"));

        if(data2.length === 0){
            setFIdx(-1);
            setLIdx(-1);
            setFirstS("-");
            setLastS("-");

            setTotalWater(0);
            setYo(0);
            setMaxBae(0);
            setAvgBae(0);
            setSilgeum(0);
            setBaenowCount(0);

        }

        setLen(json.length + (data2 != null ? data2.length : 0));

        var clickedDate = String(curDate.getMonth()+1).padStart(2,'0') + '/' + String(curDate.getDate()).padStart(2,'0');
        var firstIdx = -1;
        var lastIdx = -1;
        if(data2 != null && data2.length > 0){

            
            data2.sort((a, b) => {
                const dateA = new Date(`${a.date.value}T${a.time.value}`);
                const dateB = new Date(`${b.date.value}T${b.time.value}`);
                return dateA - dateB; // 오름차순 정렬
            });
            
            // 3. 정렬된 데이터를 다시 localStorage에 저장
            localStorage.setItem("data", JSON.stringify(data2));



            var isFirstCount = 0;
            for (let i = 0; i < data2.length; i++) {
                const values = data2[i];
                const selectedDate = values["date"]["value"].substring(5, 7) + '/' + values["date"]["value"].substring(8, 10);
                const Today = (String(curDate.getMonth() + 1).padStart(2, '0') + '/' + String(curDate.getDate()).padStart(2, '0'));
                //if (selectedDate === Today && parseInt(values["water"]["value"]) > 0 && (values["count"] === 'Y')) {
                if (isToday(selectedDate, values["time"]["value"], String(curDate.getMonth()+1).padStart(2,'0') + '/' + String(curDate.getDate()).padStart(2,'0')) && parseInt(values["water"]["value"]) > 0 && values["count"] === 'Y') {
                    isFirstCount += 1;
                    setBaenowCount(isFirstCount);
                }
            }


            for(let i =0; i<data2.length;i++){
                var values = data2[i];
                var selectedDate = values["date"]["value"].substring(5,7) + '/' + values["date"]["value"].substring(8,10);
                
                //if(clickedDate === selectedDate && parseInt(values["water"]["value"]) > 0 && values["count"] === 'Y'){
                if (isToday(selectedDate, values["time"]["value"], String(curDate.getMonth()+1).padStart(2,'0') + '/' + String(curDate.getDate()).padStart(2,'0')) && parseInt(values["water"]["value"]) > 0) {
                    firstIdx = i
                    break;
                }
                //bn += parseInt(values["drunk"]["value"]);
                //if(NowString === selectedDate) newTotal += parseInt(values["drunk"]["value"]); // 현재 날짜에 해당하는 water 값 추가
            }

            for(let i =data2.length-1; i>=0;i--){
                var values = data2[i];
                var selectedDate = values["date"]["value"].substring(5,7) + '/' + values["date"]["value"].substring(8,10);
                //if(clickedDate === selectedDate && parseInt(values["water"]["value"]) > 0 && values["count"] === 'Y'){
                if (isToday(selectedDate, values["time"]["value"], String(curDate.getMonth()+1).padStart(2,'0') + '/' + String(curDate.getDate()).padStart(2,'0')) && parseInt(values["water"]["value"]) > 0) {
                    lastIdx = i;
                    break;
                }
            }   

            if(firstIdx === lastIdx && firstIdx === -1){
                setFIdx(firstIdx);
                setLIdx(lastIdx);
                setFirstS("-");
                setLastS("-");

                setTotalWater(0);
                setYo(0);
                setMaxBae(0);
                setAvgBae(0);
                setSilgeum(0);

            }else{
                //console.log("fI", firstIdx, lastIdx);

                var totWater = 0;
                var yoCnt = 0;
                var maxB = 0;
                var totBae = 0;
                var silgeumCnt = 0;
                var avgCount = 0;
                for(var i = 0; i <= data2.length-1; i++){
                    const values = data2[i];
                    var selectedDate = values["date"]["value"].substring(5,7) + '/' + values["date"]["value"].substring(8,10);
                    if(isToday(selectedDate, values["time"]["value"], String(curDate.getMonth()+1).padStart(2,'0') + '/' + String(curDate.getDate()).padStart(2,'0')) ){
                        totWater += parseInt(values["drunk"]["value"]);
                        yoCnt += parseInt(values["yo"]["value"]);
                        silgeumCnt += (values["silgeum"]["value"] === 'Y' ? 1 : 0);
                        totBae += parseInt(values["water"]["value"]);
                        maxB = Math.max(maxB, parseInt(values["water"]["value"]));
                        avgCount += 1;
                    }
                }

                setTotalWater(totWater);
                setYo(yoCnt);
                setMaxBae(maxB);
                setAvgBae(Math.floor(totBae / (totBae === 0 ? 10000 : avgCount)));
                setSilgeum(silgeumCnt);



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
                setFirstS(data2[firstIdx]?.["time"]?.["value"]);
                setLastS(data2[lastIdx]?.["time"]?.["value"]);
            }
        }

    }



    useEffect(()=>{

        const pivot = curDate;
        const tommorow = new Date(pivot);
        tommorow.setDate(pivot.getDate() + 1);
        setTommorow(String(tommorow.getFullYear()) + "-" + String(tommorow.getMonth()+1).padStart(2,'0') + "-" + String(tommorow.getDate()).padStart(2,'0'));
        //source
        const source = localStorage.getItem("imageSource");

        dispatch(setUrl("-"));


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

       update();

    },[]);


    


    const navigate = useNavigate();

    const handleYesterday = (e) => {
        const pivot = curDate;
        const yesterday = new Date(pivot);
        yesterday.setDate(pivot.getDate() - 1);
        setCurDate(yesterday);
    
        setMonth(String(yesterday.getMonth() + 1).padStart(2, '0'));
        setDay(String(yesterday.getDate()).padStart(2, '0'));
        setClickCount(clickCount + 1);
        setBaenowCount(0);
    
        const data2 = JSON.parse(localStorage.getItem("data"));
        const clickedDate = String(yesterday.getMonth() + 1).padStart(2, '0') + '/' + String(yesterday.getDate()).padStart(2, '0');
        let firstIdx = -1;
        let lastIdx = -1;
        var countBaenow = 0;
    
        if (data2 != null && data2.length > 0) {
            for (let i = 0; i < data2.length; i++) {
                const values = data2[i];
                const selectedDate = values["date"]["value"].substring(5, 7) + '/' + values["date"]["value"].substring(8, 10);
                const Today = (String(yesterday.getMonth() + 1).padStart(2, '0') + '/' + String(yesterday.getDate()).padStart(2, '0'));

                if (isToday(selectedDate, values["time"]["value"], Today) && parseInt(values["water"]["value"]) > 0 && values["count"] === 'Y') {
                    countBaenow += 1;
                    setBaenowCount(countBaenow);
                }

                if (isToday(selectedDate, values["time"]["value"], Today) && parseInt(values["water"]["value"]) > 0) {
                    firstIdx = i;
                    break;
                }
            }
    
            for (let i = data2.length - 1; i >= 0; i--) {
                const values = data2[i];
                const selectedDate = values["date"]["value"].substring(5, 7) + '/' + values["date"]["value"].substring(8, 10);
                const Today = (String(yesterday.getMonth() + 1).padStart(2, '0') + '/' + String(yesterday.getDate()).padStart(2, '0'));
                //if (clickedDate === selectedDate && parseInt(values["water"]["value"]) > 0 && values["count"] === 'Y') {
                if (isToday(selectedDate, values["time"]["value"], Today) && parseInt(values["water"]["value"]) > 0) {
                    lastIdx = i;
                    break;
                }
            }
    
            if (firstIdx === -1 && lastIdx === -1) {
                setFIdx(firstIdx);
                setLIdx(lastIdx);
                setFirstS("-");
                setLastS("-");

                setTotalWater(0);
                setYo(0);
                setMaxBae(0);
                setAvgBae(0);
                setSilgeum(0);

            } else {

                // 요약구하기
                var totWater = 0;
                var yoCnt = 0;
                var maxB = 0;
                var totBae = 0;
                var silgeumCnt = 0;
                var avgCount = 0;
                for(var i = 0; i <= data2.length-1; i++){
                    const values = data2[i];
                    var selectedDate = values["date"]["value"].substring(5,7) + '/' + values["date"]["value"].substring(8,10);
                    const Today = (String(yesterday.getMonth() + 1).padStart(2, '0') + '/' + String(yesterday.getDate()).padStart(2, '0'));
                    if(isToday(selectedDate, values["time"]["value"], Today) ){
                        totWater += parseInt(values["drunk"]["value"]);
                        yoCnt += parseInt(values["yo"]["value"]);
                        silgeumCnt += (values["silgeum"]["value"] === 'Y' ? 1 : 0);
                        totBae += parseInt(values["water"]["value"]);
                        maxB = Math.max(maxB, parseInt(values["water"]["value"]));
                        avgCount += 1;
                    }
                }

                setTotalWater(totWater);
                setYo(yoCnt);
                setMaxBae(maxB);
                setAvgBae(Math.floor(totBae / (totBae === 0 ? 10000 : avgCount)));
                setSilgeum(silgeumCnt);

                const first = data2[firstIdx]?.["time"]?.["value"];
                const last = data2[lastIdx]?.["time"]?.["value"];
    
                // first와 last가 모두 존재하는 경우에만 getMinuteDifference 호출
                if (first && last) {
                    setDiff(getMinuteDifference(first, last));
    
                    // 시간을 오전/오후 형식으로 설정
                    const formatTime = (time) => {
                        const [hour, minute] = time.split(":").map(Number);
                        const period = hour < 12 ? "오전" : "오후";
                        const formattedHour = hour % 12 || 12;
                        return `${period} ${formattedHour}시 ${minute}분`;
                    };
    
                    setFirstS(formatTime(first));
                    setLastS(formatTime(last));
                } else {
                    // first 또는 last가 없을 경우 "-"로 설정
                    setFirstS("-");
                    setLastS("-");
                }
    
                setFIdx(firstIdx);
                setLIdx(lastIdx);
            }
        }
    };
    

    const handleTommorow = (e) => {
        const pivot = curDate;
        const tommorow = new Date(pivot);
        tommorow.setDate(pivot.getDate() + 1);
        setCurDate(tommorow);

        setMonth(String(curDate.getMonth()+1).padStart(2,'0'));
        setDay(String(curDate.getDate()).padStart(2,'0'));
        setClickCount(clickCount+1);

        const data2 = JSON.parse(localStorage.getItem("data"));
        const clickedDate = String(tommorow.getMonth() + 1).padStart(2, '0') + '/' + String(tommorow.getDate()).padStart(2, '0');
        let firstIdx = -1;
        let lastIdx = -1;

        setBaenowCount(0);
        let countBaenow = 0;
    
        if (data2 != null && data2.length > 0) {
            for (let i = 0; i < data2.length; i++) {
                const values = data2[i];
                const selectedDate = values["date"]["value"].substring(5, 7) + '/' + values["date"]["value"].substring(8, 10);
                const Today = (String(tommorow.getMonth() + 1).padStart(2, '0') + '/' + String(tommorow.getDate()).padStart(2, '0'));

                if (isToday(selectedDate, values["time"]["value"], Today) && parseInt(values["water"]["value"]) > 0 && values["count"] === 'Y') {
                    countBaenow += 1;
                    setBaenowCount(countBaenow);
                }
                //if (clickedDate === selectedDate && parseInt(values["water"]["value"]) > 0 && values["count"] === 'Y') {
                if (isToday(selectedDate, values["time"]["value"], Today) && parseInt(values["water"]["value"]) > 0) {
                    firstIdx = i;
                    break;
                }
            }
    
            for (let i = data2.length - 1; i >= 0; i--) {
                const values = data2[i];
                const selectedDate = values["date"]["value"].substring(5, 7) + '/' + values["date"]["value"].substring(8, 10);
                const Today = (String(tommorow.getMonth() + 1).padStart(2, '0') + '/' + String(tommorow.getDate()).padStart(2, '0'));
                //if (clickedDate === selectedDate && parseInt(values["water"]["value"]) > 0 && values["count"] === 'Y') {
                if (isToday(selectedDate, values["time"]["value"], Today) && parseInt(values["water"]["value"]) > 0) {
                    lastIdx = i;
                    break;
                }
            }
    
            if (firstIdx === -1 && lastIdx === -1) {
                setFIdx(firstIdx);
                setLIdx(lastIdx);
                setFirstS("-");
                setLastS("-");

                setTotalWater(0);
                setYo(0);
                setMaxBae(0);
                setAvgBae(0);
                setSilgeum(0);
            } else {

                var totWater = 0;
                var yoCnt = 0;
                var maxB = 0;
                var totBae = 0;
                var silgeumCnt = 0;
                var avgCount = 0;
                for(var i = 0; i <= data2.length-1; i++){
                    const values = data2[i];
                    var selectedDate = values["date"]["value"].substring(5,7) + '/' + values["date"]["value"].substring(8,10);
                    const Today = (String(tommorow.getMonth() + 1).padStart(2, '0') + '/' + String(tommorow.getDate()).padStart(2, '0'));
                    if(isToday(selectedDate, values["time"]["value"], Today) ){
                        totWater += parseInt(values["drunk"]["value"]);
                        yoCnt += parseInt(values["yo"]["value"]);
                        silgeumCnt += (values["silgeum"]["value"] === 'Y' ? 1 : 0);
                        totBae += parseInt(values["water"]["value"]);
                        maxB = Math.max(maxB, parseInt(values["water"]["value"]));
                        avgCount += 1;
                    }
                }

                
                
                
                setTotalWater(totWater);
                setYo(yoCnt);
                setMaxBae(maxB);
                setAvgBae(Math.floor(totBae / (totBae === 0 ? 10000 : avgCount)));
                setSilgeum(silgeumCnt);





                const first = data2[firstIdx]?.["time"]?.["value"];
                const last = data2[lastIdx]?.["time"]?.["value"];
    
                // first와 last가 모두 존재하는 경우에만 getMinuteDifference 호출
                if (first && last) {
                    setDiff(getMinuteDifference(first, last));
    
                    // 시간을 오전/오후 형식으로 설정
                    const formatTime = (time) => {
                        const [hour, minute] = time.split(":").map(Number);
                        const period = hour < 12 ? "오전" : "오후";
                        const formattedHour = hour % 12 || 12;
                        return `${period} ${formattedHour}시 ${minute}분`;
                    };
    
                    setFirstS(formatTime(first));
                    setLastS(formatTime(last));
                } else {
                    // first 또는 last가 없을 경우 "-"로 설정
                    setFirstS("-");
                    setLastS("-");
                }
    
                setFIdx(firstIdx);
                setLIdx(lastIdx);
            }
        }


    }

    const loadData = async () => {
        const data2 = JSON.parse(localStorage.getItem("data")); // Assuming you're getting data from local storage
        const l1 = []; // Initialize your l1 array
        let isFirstCount = 0;
        let totBae = 0;
    //[{"date":{"value":"2024-11-03"},"time":{"value":"19:05"},"drunk":{"value":350},"water":{"value":0},"yo":{"value":0},"silgeum":{"value":"N"},"weird":{"value":""},"url":{"value":"-"},"count":"Y"},{"date":{"value":"2024-11-03"},"time":{"value":"19:05"},"drunk":{"value":0},"water":{"value":"310"},"yo":{"value":"1"},"silgeum":{"value":"N"},"weird":{"value":"-"},"url":{"value":"-"},"count":"Y"}]
        if (data2 != null) {
            for (let i = 0; i < data2.length; i++) {
                const values = data2[i];
                const selectedDate = values["date"]["value"].substring(5, 7) + '/' + values["date"]["value"].substring(8, 10);
                const Today = (String(curDate.getMonth() + 1).padStart(2, '0') + '/' + String(curDate.getDate()).padStart(2, '0'));
                //if (selectedDate === Today && parseInt(values["water"]["value"]) > 0 && (values["count"] === 'Y')) {
                if (isToday(selectedDate, values["time"]["value"], Today) && parseInt(values["water"]["value"]) > 0 && values["count"] === 'Y') {
                    isFirstCount += 1;
                    setBaenowCount(isFirstCount);
                }
                //isToday(selectedDate, values["time"]["value"], Today)
    
                //if (Today !== selectedDate) continue;
                if(!isToday(selectedDate, values["time"]["value"], Today)) continue;

                l1.push(values["time"]["value"]);
                l1.push(values["drunk"]["value"]);
                l1.push(values["water"]["value"]);
                l1.push(values["yo"]["value"]);
                l1.push(values["silgeum"]["value"]);
    
                // Push "weird" value or "-" if it doesn't exist
                l1.push(values["weird"]["value"].length ? values["weird"]["value"] : "-");
    
                totBae += parseInt(values["water"]["value"]);


                // Now, we need to fetch the base64 URL from IndexedDB
                const url = values["url"]["value"].length ? values["url"]["value"] : "-";
                const base64Url = url !== "-" ? await getFromIndexedDB(url) : "-"; // Fetch base64 URL from IndexedDB
    
                l1.push(base64Url); // Push the base64 URL (or "-" if not available)
            }
        }


        if(isFirstCount >= 4 && totBae >= 1000){
            setPopupFreq(true);

            var firstDateTime = `${data2[0]["date"]["value"]} ${data2[0]["time"]["value"]}`;
            var lastDateTime = `${data2[data2.length-1]["date"]["value"]} ${data2[data2.length-1]["time"]["value"]}`;
            var alpha = getMinuteDifference2(firstDateTime, lastDateTime) / Math.max(data2.length, 1);
            if(alpha === 0){
                setRec(0);
            }
            else{
                setRec(addMinutesToTime(data2[data2.length-1]["time"]["value"], alpha));
            }
        }
    
        // Update your state or do whatever you need with the l1 array
        setL1(l1);
    };

    const loadDataSafe = async () => {
        try {
            await loadData();
        } catch (error) {
            console.error("Error loading data:", error);
        }
    };

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
                //if(selectedDate === Today && parseInt(values["water"]["value"]) > 0  && (values["count"] === "Y")){
                if (isToday(selectedDate, values["time"]["value"], Today) && parseInt(values["water"]["value"]) > 0 && values["count"] === 'Y') {
                    isFirstCount += 1;
                    setBaenowCount(isFirstCount);
                }
            }
        }
            

        loadData();

        //let isFirstCount = 0;
        //let is6 = false;
        //const data2 = JSON.parse(localStorage.getItem("data"));
        //console.log(lastInfo);
        if(isFirstCount === 1 && 
            (String(currentDate.getMonth()+1).padStart(2,'0') ===  String(curDate.getMonth() + 1).padStart(2,'0') && String(currentDate.getDate()).padStart(2,'0') === String(curDate.getDate()).padStart(2,'0'))
            &&
            lastInfo["count"] === 'Y'
            && 
            parseInt(lastInfo["water"]["value"]) > 0 
        ){
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
        //setL1(l1);
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

        update();

        //localStorage.setItem("data",updatedLL1);
    };

    const goBack = (e) => {
        navigate("/main");
    }
    

    const handleConfirm = () => {
        // 첫 도뇨 확인 로직 추가
        setIsPopupVisibleFirst(false);
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

        const dataJson = {
            date: { value: Today },
            time: { value: mediumTime },
            drunk: { value: 0 },
            water: { value: `${mediumWater}` },
            yo: { value: "0" },
            silgeum: { value: "N" },
            weird: { value: "" },
            url: { value: "" },
            count : "Y",
        };
//[{"date":{"value":"2024-11-03"},"time":{"value":"02:18"},"drunk":{"value":350},"water":{"value":"130"},"yo":{"value":"1"},"silgeum":{"value":"N"},"weird":{"value":""},"url":{"value":""},"count":"N"},{"date":{"value":"2024-11-03"},"time":{"value":"03:18"},"drunk":{"value":0},"water":{"value":"180"},"yo":{"value":"1"},"silgeum":{"value":"Y"},"weird":{"value":"-"},"url":{"value":"-"},"count":{"value":"Y"}}]
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
    }

    const onClose6 = () =>{
        setIsPopupVisible6(false);
    }

    const onConfirm6 = () =>{
        setIsPopupVisible6(false);
        navigate("/main");
    }

    const handleYes = (e) => {
        setIsPopupVisibleFirst(false);
        navigate("/main");
    }


    const clickToMakeBigger = (base64Url) => {
        //(base64Url);
        setVisiblePicture(base64Url);
    }

    const onClosePicture = (e) => {
        setVisiblePicture("");
    }

    const onConfirmFreq = (e) => {
        setPopupFreq(false);
    }

    


    return(
        <div className="Result">

            <FirstUrinePopup
                isVisible={isPopupVisibleFirst}
                onClose={handleYes}
                onConfirm={handleConfirm}
            />

            <SixHoursPopup
                isVisible={isPopupVisible6}
                onClose={onClose6}
                onConfirm={onConfirm6}
                onAutomatic={handleAutomatic}
            />

            <BigPicture
                isVisiblePicture={visiblePicture}
                onClose={onClosePicture}
            />

            <Fregrec
                isVisible={popupFreq}
                onConfirm={onConfirmFreq}
                rec={rec}
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
                            {BaenowCount > 1 ? Math.ceil((diff / (BaenowCount - 1))*10)/10 + '분' : '-'}
                        </div>
                        <div className="GridItem">
                            일일 도뇨 횟수
                        </div>
                        <div className="GridItem">
                            {(`${BaenowCount} 회`)}
                        </div>

                    </div>
                        
                </div>
                <div className="GrayBlock">
                    <div className="SummaryTitle">
                        요약
                    </div>
                    <div className="grid">
                        <div className="GridItem">
                            총 수분 섭취량
                        </div>
                        <div className="GridItem" style={{textAlign: "right"}}>
                            {totalWater}
                        </div>
                        <div className="GridItem">
                            최대 배뇨량 
                        </div>
                        <div className="GridItem">
                            {maxBae}
                        </div>
                        <div className="GridItem">
                            평균 배뇨량
                        </div>
                        <div className="GridItem">
                            {avgBae}
                        </div>
                        <div className="GridItem">
                            요절박 횟수
                        </div>
                        <div className="GridItem">
                            {yo}
                        </div>
                        <div className="GridItem">
                            실금 횟수
                        </div>
                        <div className="GridItem">
                            {silgeum}
                        </div>

                    </div>
                </div>
            </div>
            <div className="Advice">
                <div className="SummaryTitle2">
                    조언
                </div>
                <div className="InfoContent2">
                    {
                        totalWater < 1500 ?
                        Advice[0] : (
                            avgBae >= 500 ?
                            Advice[2] :(
                                avgBae >= 400 ?
                                    Advice[1] : ""
                            )

                        )

                    }
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
                                                    return <td key={subIndex}>{item==="-" ? "-" : <img src={item} alt={"snap"} width='20' height='20'></img>}</td>    
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
                                    //console.log("index", index);
                                    const rowItems = ll1.slice(index, index + 7);
                                    return (
                                        <tr key={index}>
                                            {rowItems.map((item, subIndex) => {

                                                if (subIndex === 0) {
                                                    return <td key={subIndex}>{convertTo12HourFormat(item)}</td>;
                                                } 
                                                else if(subIndex === 6 && item){
                                                    return <td key={subIndex}>{item==="-" ? "-" : <img src={item} alt={"snap"} width='20' height='20' onClick={() => clickToMakeBigger(item)}></img>}</td>    
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
          <p style={{fontSize:"13px"}}>오늘 처음 도뇨를 기록하시려면 '아니오'를 눌러주세요.</p>
          <div className="popup-buttons">
            <button onClick={onClose} className="popup-button cancel">아니요</button>
            <button onClick={onConfirm} className="popup-button confirm">예</button>
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

  function Fregrec({ isVisible, onConfirm, rec }) {
    if (!isVisible) return null;
  
    return (
      <div className="popup-overlay3">
        <div className="popup-content2">
          <h4>다음 도뇨 시각은 {rec.split(":")[0] + '시' + rec.split(":")[1] + '분 '}에 권장됩니다.</h4>
          <div className="popup-buttons">
            <button onClick={onConfirm} className="popup-button confirm">예</button>
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



  function PicturePopup({ isVisible, src }) {
    if (!isVisible) return null;

    const handleClose = (e) => {
        // 클릭한 요소가 팝업 이미지가 아닌 경우에만 닫기 실행
        if (e.target.className === "popup-overlay") {
            isVisible(false); // 부모 컴포넌트에서 상태 제어 함수 필요
        }
    };
  
    return (
      <div className="popup-overlay" onClick={handleClose}>
        <img src={src} width="200px" height="200px" alt="popup"></img>
      </div>
    );
  }


  const getFromIndexedDB = async (key) => {
    const db = await openDB("ImageDB", 1);
    return await db.get("images", key);
  };

  

  function BigPicture({isVisiblePicture, onClose}){
    if(!isVisiblePicture) return null;
    return(
        <div className="popup-overlay-Picture">
            <FontAwesomeIcon icon={faX} onClick={onClose} style={{position:"absolute", top:"5px", right: "5px" }}/>
            <img src={isVisiblePicture} alt={"snap"} width='88%' height='88%'></img>
        </div>
    );

  }


  

  const LoadImageFromIndexedDB = async (uuid) => {
    try {
        const base64Url = await getFromIndexedDB(uuid); // Fetch Base64 from IndexedDB using UUID
        if (base64Url) {
            //setSource(base64Url); // Set the fetched Base64 image to the component state
            return(
                <img src={base64Url} alt={"snap"} width='20' height='20'></img>
            );
        } else {
            console.warn("No image found for the given UUID");
        }
    } catch (error) {
        console.error("Error loading image from IndexedDB:", error);
    }
};