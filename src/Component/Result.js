import "./Result.css";
import data from "../Data/data.json";
import {useState, useEffect, useRef} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

const Result = () => {

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
            var value = Object.values(data[i]);
            if(values[0] !== (String(curDate.getMonth()+1).padStart(2,'0') + '/' + String(curDate.getDate()).padStart(2,'0'))) continue;
            for(let j = 1; j < values.length; j++){
                l.push(values[j]);
            }
            l.push(" ");
        }

        const data2 = JSON.parse(localStorage.getItem("data"));
        if(data2 != null){
            for(let i =0; i<data2.length;i++){
                var values = data2[i];
                var selectedDate = values["date"]["value"].substring(5,7) + '/' + values["date"]["value"].substring(8,10);

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
                l1.pussh(" ");
            }
        }
        setL(l);
        setL1(ll1);
    },[clickCount]);


    return(
        <div className="Result">
            <div className="ResultHeader">
                <FontAwesomeIcon icon={faCaretLeft} style={{color: 'black', width: "20px"}} onClick={handleYesterday}/>
                <div className="Date">
                    {
                        String(curDate.getMonth()+1).padStart(2,'0') + '/' + String(curDate.getDate()).padStart(2,'0') + (String(currentDate.getMonth()+1).padStart(2,'0') ===  String(curDate.getMonth() + 1).padStart(2,'0') && String(currentDate.getDate()).padStart(2,'0') === String(curDate.getDate()).padStart(2,'0') ? "(오늘)" : "" )
                    }
                </div>
                <FontAwesomeIcon icon={faCaretRight} style={{color: 'black', width: "20px"}} onClick={handleTommorow}/>
            </div>
            <div className="ResultSummary">
                <div className="GrayBlock">

                </div>
                <div className="GrayBlock">

                </div>
            </div>
            <div className="Advice">

            </div>
            <div className="Chart">
                <div className="item">시간</div>
                <div className="item">수분섭취량(ml)</div>
                <div className="item">배뇨량(ml)</div>
                <div className="item">요절박</div>
                <div className="item">실금</div>
                <div className="item">이상증세</div>
                <div className="item">소변사진</div>
                <div className="item">삭제</div>
                {

                    l1.length>0 ? l1.map(e => {
                        return <div>{e}</div>
                    }):null
                }
                {
                    ll1.length>0 ? ll1.map(e =>{
                        return <div>{e}</div>
                    }):null
                }



            </div>
        </div>




    )


}

export default Result;