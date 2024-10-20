import "./BodyList.css";
import React from 'react';
import List1 from "./List1";
import List2 from "./List2";
import List3 from "./List3";
import List4 from "./List4";
import './List.css';
import data from "../Data/data.json";
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from "react-router-dom";
import {changeState, setDate, setSilgeum, setTimeRedux, setQueue, enqueue, setPees, setUrl, setWater, setWeird, setYo} from "./store";

function BodyList(props) {


  const dispath = useDispatch();
  const navigate = useNavigate();

  const yes = useSelector((state) => {
    return state.isYes;
  });

  const date1 = useSelector((state) => {
    return state.date;
  });

  const timeR = useSelector((state) => {
    return state.time;
  });

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

  const url = useSelector((state) => {
    return state.url;
  });

  const globlaQueue = useSelector((state) => {
    return state.queue;
  });


  const Save = (e) => {
    const dataJson = {
      date : date1,
      time : timeR,
      drunk : water,
      water : pees,
      yo : yo,
      silgeum : silgeum,
      weird : weird,
      url : url
    }
    if(localStorage.getItem('data')){
      localStorage.setItem('data', JSON.stringify([...JSON.parse(localStorage.getItem('data')), dataJson]));
    }else{
      localStorage.setItem('data', JSON.stringify([dataJson]));
    }
    navigate('/loading');
  }

  if(globlaQueue.type){
    console.log("listqueue : " + globlaQueue.queue);
  }

  const { modalQueue } = props;

  function l1(idx) {

    if(idx === 2){
      const upI = modalQueue[0];
      return <List1 className={`Secu0${upI}`} />;
    }
    if(idx === 3){
      const upI = modalQueue[1];
      return <List1 className={`Secu1${upI}`} />;
    }

    return <List1 className={`Sec${idx}`} />;
  }
  
  

  function l2(idx) {

    if(idx === 2){
      const upI = modalQueue[0];
      return <List2 className={`Secu0${upI}`} />;
    }
    if(idx === 3){
      const upI = modalQueue[1];
      return <List2 className={`Secu1${upI}`} />;
    }

    return <List2 className={`Sec${idx}`} />;
  }
  
  function l3(idx) {

    if(idx === 2){
      const upI = modalQueue[0];
      return <List3 className={`Secu0${upI}`} />;
    }
    if(idx === 3){
      const upI = modalQueue[1];
      return <List3 className={`Secu1${upI}`} />;
    }

    return <List3 className={`Sec${idx}`} />;
  }


  function l4(idx) {

    if(idx === 2){
      const upI = modalQueue[0];
      return <List4 className={`Secu0${upI}`} />;
    }
    if(idx === 3){
      const upI = modalQueue[1];
      return <List4 className={`Secu1${upI}`} />;
    }

    return <List4 className={`Sec${idx}`} />;
  }
  
  const componentMap = {
    1: l1,
    2: l2,
    3: l3,
    4: l4
  };

  return (
    <div className="BodyList">
      {modalQueue.map((element, index) => {
        const Component = componentMap[element]; // element에 맞는 컴포넌트 선택
        return Component ? (
          <div key={`sec-${index}`}>  
            {Component(index)}
          </div>
        ) : null;
      })}
      <button className="SaveInfoBtn" onClick={Save}>
        기록 저장하기
      </button>
    </div>
  );
}

export default BodyList;
