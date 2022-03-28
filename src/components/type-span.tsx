import React, { useState } from "react";
import useInterval from "../utilities/app-hooks";

interface IControlProps {
  children: string;
  initialText?: string;
  speed?: number;
  pauseOnComma?: boolean;
  startDelay?: number;
}

function TypeSpan({children, initialText, speed, pauseOnComma, startDelay}: IControlProps){
  const letterDelay = speed ?? 70;
  const isPausing = pauseOnComma ?? true;
  const [textPart, setTextPart] = useState(initialText ?? "");
  const [isFinished, setIsFinished] = useState(false);
  const [offset, setOffset] = useState(0);
  const [delay, setDelay] = useState(startDelay ?? letterDelay);
  
  function checkForPause(){
    if(isPausing){
      const nextChar = children.substring(offset, offset + 1);
      if(nextChar === ","){
        setDelay(letterDelay * 5);
      }
      else if(delay !== letterDelay){
        setDelay(letterDelay);
      }
    }
  }

  useInterval(() => {
    const nextPart = children.substring(0, offset);
    setTextPart(nextPart);
    checkForPause();
    if(offset === children.length) setIsFinished(true);
    setOffset(offset + 1);

  }, isFinished ? null : delay);

  return (
    <div>
      <span>{textPart}</span>
    </div>
  )
}

export default TypeSpan;