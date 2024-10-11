import "./List.css";
import React from 'react'

function List4({ className }) {

    console.log(className);
    return (

        className? <div className={`List ${className}`}>
            List4
        </div>
        :
        null
    
    );
    
  }

export default List4