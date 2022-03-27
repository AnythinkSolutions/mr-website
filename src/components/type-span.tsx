import React, { useState } from "react";
import useInterval from "../utilities/app-hooks";

interface IControlProps {
  children: string;
  initialText?: string;
  speed?: number;
  pauseOnComma?: boolean;
}

function TypeSpan({children, initialText, speed, pauseOnComma}: IControlProps){
  const defaultDelay = speed ?? 70;
  const isPausing = pauseOnComma ?? true;
  const [textPart, setTextPart] = useState(initialText ?? "");
  const [isFinished, setIsFinished] = useState(false);
  const [offset, setOffset] = useState(0);
  const [delay, setDelay] = useState(defaultDelay);
  
  function checkForPause(){
    if(isPausing){
      const nextChar = children.substring(offset, offset + 1);
      if(nextChar === ","){
        setDelay(defaultDelay * 5);
      }
      else if(delay !== defaultDelay){
        setDelay(defaultDelay);
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