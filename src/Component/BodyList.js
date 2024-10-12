import "./BodyList.css";
import React from 'react';
import List1 from "./List1";
import List2 from "./List2";
import List3 from "./List3";
import List4 from "./List4";
import './List.css';

function BodyList(props) {
  const { modalQueue } = props;

  function l1(className) {
    return <List1 className={className} />;
  }
  
  function l2(className) {
    return <List2 className={className} />;
  }
  
  function l3(className) {
    return <List3 className={className} />;
  }

  function l4(className) {
    return <List4 className={className} />;
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
            {Component(`Sec${index}`)}
          </div>
        ) : null;
      })}
    </div>
  );
}

export default BodyList;
