import { useState } from "react";


export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  const transition = (initialMode, replace = false) => {
    // In some situations we'll transition twice and then have the back action return us to the initial state. 
    if (replace) history.pop();
    setMode(initialMode);
    history.push(initialMode);
  };

  const back = () => {
    //our history array will always need to have a length that is greater than or equal to 1.
    if (history.length === 1) return;
    history.pop();
    setMode(history[history.length - 1]);
  };

  return { mode, transition, back };
}