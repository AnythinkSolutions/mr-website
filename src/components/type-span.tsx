import React, { useState } from "react";
import { useInterval } from "../utilities/app-hooks";

interface IControlProps {
  children: string;
  initialText?: string;
  speed?: number;
  pauseOnComma?: boolean;
  startDelay?: number;
  onFinish?: () => void;
  withCursor?: boolean;
  cursorDelay?: number;
  textStyle?: string;
}

function TypeSpan({children, initialText, speed, pauseOnComma, startDelay, onFinish, withCursor, cursorDelay, textStyle}: IControlProps){
  const letterDelay = speed ?? 70;
  const isPausing = pauseOnComma ?? true;
  const [textPart, setTextPart] = useState(initialText ?? "");
  const [isFinished, setIsFinished] = useState(false);
  const [offset, setOffset] = useState(0);
  const [delay, setDelay] = useState(startDelay ?? letterDelay);
  const [started, setStarted] = useState(false);
  const [cursorStyle, setCursorStyle] = useState("blinkingCursor");
  
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
    if(!started){
      setStarted(true);
      if(withCursor && cursorDelay){
        setDelay(cursorDelay);  //start with the blinking cursor
        return;
      }
    }
    else if(withCursor){
      setCursorStyle(""); //don't blink the cursor while typing
    }

    const nextPart = children.substring(0, offset);
    setTextPart(nextPart);
    checkForPause();
    if(offset === children.length){
      setIsFinished(true);
      setCursorStyle("blinkingCursor");  //start the cursor blinking after we're finished
      if(onFinish) onFinish();
    }
    setOffset(offset + 1);

  }, isFinished ? null : delay);

  return (
    <div>
      <span className={textStyle}>{textPart}</span>
      {withCursor && started && <span className={cursorStyle}>_</span>}
    </div>
  )
}

export default TypeSpan;