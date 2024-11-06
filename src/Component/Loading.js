// Loading.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Loading.css'; // Import the CSS for animations
import {useSelector, useDispatch} from 'react-redux';
import {changeState, setDate, setSilgeum, setTimeRedux, setQueue, enqueue, dequeue, setPees, setUrl, setWater, setWeird, setYo} from "./store";



const Loading = () => {

    const water = useSelector((state) => {
        return state.water;
      });
    
      const pees = useSelector((state) => {
        return state.pees;
      });
    
      const silgeum = useSelector((state) => {
        return state.silgeum;
      });
    
      const yo = useSelector((state) => {
        return state.yo;
      });
    
      const weird = useSelector((state) => {
        return state.weird;
      });


    const Advice = [
        [
            "도뇨 전에 손을 씻고 소독하는 것이 감염을 예방하는 데 매우 중요합니다.",
            "도뇨관은 일회용을 사용하거나 소독 후 재사용하여 감염을 예방하세요.",
            "특별한 문제가 보이지 않더라도 1년에 1회 방광검사를 하여 방광 내 결석, 요도 손상 등을 점검하는 것이 좋습니다.",
            "도뇨관 삽입에 지속적으로 어려움이 있거나, 삽입 시 출혈이 있을 때는 병원을 방문해야 합니다.",
        ],
        [
            "혼탁한 소변이나 색상이 변한 소변은 감염의 징후일 수 있으니 기록 후 의료진과 상담하세요.",
            "발열이나 구토 등의 증상이 있을 경우 즉시 기록하고 병원을 방문하는 것이 좋습니다.",
            "소변에서 불쾌한 냄새가 나거나 배뇨통이 발생할 경우, 관련 기록을 자세히 남기고 증상이 지속되면 의료진과 상의하세요.",
            "방광이 꽉 찼는데 도뇨관 삽입이 안 되며, 두통, 식은땀, 안절부절 하는 등 자율신경과반사 증상이 나타날 때는 응급 상황이므로 즉시 응급실로 갑니다. ",
        ],
        [
            "실금이 발생한 후에는 배뇨 기록을 통해 적절한 도뇨 주기를 조정하세요.",
            "실금이 반복되면 다음 도뇨 시간을 30분~1시간 앞당겨 실금 발생을 줄일 수 있습니다.",
            "실금이 자주 발생할 경우 수분 섭취량을 조정하거나 의료 전문가와 상의하는 것이 좋습니다.",
        ],
        [
            "녹차, 커피, 콜라는 이뇨작용을 촉진하여 도뇨 시간을 단축해야 되거나 더 자주 소변이 마려울 수 있습니다.",
            "야간뇨를 방지하고 숙면을 취하기 위해서는 오후 2시 이후로 수분섭취를 제한해야 합니다.",
            "수분 섭취를 균등하게 분산해 하루에 1.5L에서 2L를 섭취하는 것이 좋습니다.",
            "충분한 수분 섭취는 도뇨 시 방광 건강을 유지하는 데 중요합니다.",
        ],
    ];
    const navigate = useNavigate();

    let arr = [];
    if(water.value !== undefined){
        arr.push(0);
    }
    if(silgeum.value === 'Y'){
        arr.push(2);
    }
    if(water.value > 0){
        arr.push(3);
    }
    if(weird.value === 'Y'){
        arr.push(1);
    }

    var idx = arr[Math.floor(Math.random()*arr.length)];

    useEffect(() => {
        // Navigate to the /result page after 3 seconds
        const timer = setTimeout(() => {
            navigate('/result');
        }, 1000);

        // Cleanup the timer
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="loading-container">
            <div className="loading-message">기록 저장 중</div>
            <div className="advice1">
                <p>{Advice[idx][Math.floor(Math.random()*Advice[idx].length)]}</p>
            </div>
        </div>
    );
};

export default Loading;
