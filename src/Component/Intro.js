import React from 'react'
import './Intro.css'
import {useRef, useEffect} from 'react'

function Intro() {

    let infoRefs = useRef([]);
   
    const max = 1500;
    const value = 700;
    
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
            <div className="InfoHorizontal" ref={addToRefs}>
                <div className="InfoTitle">
                    다음 권장 도뇨 시간은
                </div>
            </div>
            <div className="InfoHorizontal" ref={addToRefs}>
                <div className="InfoTitle">
                    평균 1회 배뇨량
                </div>
            </div>
            <div className="InfoHorizontal2" ref={addToRefs}>
                <div className="InfoTitle">
                    최근 도뇨 주기 분석
                </div>
            </div>

            <div className="InfoVerticalBack">
                <div className="InfoVertical" ref={addToRefs}>
                    <div className="InfoTitle">
                        총 수분 섭취량
                    </div>
                    <svg className="progress-ring" width="120" height="120" style={{ position: 'absolute', top: 45, left: 18.43 }}>

                        <circle
                            
                            stroke="#ccc"
                            strokeWidth="10"
                            fill="transparent"
                            r="52"
                            cx="60"
                            cy="60"
                            position="absolute"
                            
                            transform="rotate(150 60 60)"

                            strokeDasharray={`${2* Math.PI * 52}`}  // 180도 만큼
    // 8시 방향에서 시작하므로 strokeDashoffset은 전체 길이의 1/4에 해당하는 값으로 설정
                            strokeDashoffset={`${(1/3) * 2 * Math.PI * 52}`}  
                        
                        />
                    </svg>
                    <svg className="progress-ring" width="120" height="120" style={{ position: 'absolute', top: 45, left: 18.43 }}>

                        <circle
                            
                            stroke="#007BFF"
                            strokeWidth="10"
                            fill="transparent"
                            r="52"
                            cx="60"
                            cy="60"

                            transform="rotate(150 60 60)"

                            strokeDasharray={`${2* Math.PI * 52}`}  // 180도 만큼
    // 8시 방향에서 시작하므로 strokeDashoffset은 전체 길이의 1/4에 해당하는 값으로 설정
                            strokeDashoffset={`${(2 * Math.PI * 52) - (4/3)*Math.PI*52*(value/max)}`}  
                            
                        />
                    </svg>
                    
                    
                
                </div>
                <div className="InfoVertical" ref={addToRefs}>
                    
                </div>
            </div>
        </div>
    )
}

export default Intro