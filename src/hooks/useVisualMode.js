import { useState } from "react";


export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  const transition = (initialMode, replace = false) => {
    // In some situations we'll transition twice and then have the back action return us to the initial state.
    setMode(initialMode);
    if (replace) {
      setHistory((prevHistory) => {
        prevHistory[prevHistory.length - 1] = initialMode;
        return [...prevHistory];
      });
    } else {
      setHistory((prevHistory) => [...prevHistory, initialMode]);
    }
  };

  const back = () => {
    //our history array will always need to have a length that is greater than or equal to 1.
    if (history.length === 1) return;

    setHistory((prevHistory) => {
      prevHistory.pop();
      setMode(prevHistory[prevHistory.length - 1]);
      return [...prevHistory];
    });
  };
  return { mode, transition, back };
};

