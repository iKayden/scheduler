import { useState } from "react";


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);

  const transition = (initial) => {
    return setMode(initial);
  };

  return { mode, transition };
}