import React from 'react'
import './Intro.css'
import {useRef, useEffect} from 'react'

function Intro() {

    let infoRefs = useRef([]);
    const percentage = (1500 / 1500) * 100;
    
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
                    <div className="circular-progress">
                        <div className="circular-progress-bar">
                            <svg viewBox="0 0 36 36" className="progress-circle">
                            <path
                                className="circle-bg"
                                d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path
                                className="circle"
                                strokeDasharray={`${percentage}, 100`}
                                d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            </svg>
                            <div className="progress-value">
                                {700}mL
                            <div className="progress-subtext">하루 권장 섭취량</div>
                            <div className="progress-subtext-small">1500mL 기준</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="InfoVertical" ref={addToRefs}>

                </div>
            </div>
        </div>
    )
}

export default Intro