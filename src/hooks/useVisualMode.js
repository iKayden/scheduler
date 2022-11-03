import { useState } from "react";


export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  const transition = (initialMode, replace = false) => {
    const historyCopy = [...history];
    // In some situations we'll transition twice and then have the back action return us to the initial state. 
    if (replace) historyCopy.pop();
    setMode(initialMode);
    historyCopy.push(initialMode);
    setHistory(historyCopy);
  };

  const back = () => {
    const historyCopy = [...history];
    //our history array will always need to have a length that is greater than or equal to 1.
    if (historyCopy.length === 1) return;
    historyCopy.pop();
    setMode(historyCopy[historyCopy.length - 1]);
    setHistory(historyCopy);
  };
  return { mode, transition, back };
};

