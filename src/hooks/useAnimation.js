import { useState, useRef, useEffect } from "react"
import usePrevious from "./usePrevious"

export default (initialValue) => {
  const [current, setValue] = useState(initialValue);
  const previous = usePrevious(current);

  const diff = current - previous;
  const animationTime = 5000;
  const frameCount = 5;
  const [frame, setFrame] = useState(null);

  useEffect(
    () => {
      const handle = setInterval(
        () => setFrame(i => i + 1),
        animationTime / frameCount
      );
      const stop = () => {
        clearInterval(handle);
        setFrame(null);
      }
      setTimeout(stop, animationTime);
      return stop;
    },
    [current]
  );

  const value = frame !== null
    ? previous + (frame * diff) / frameCount
    : current;

  return [value, setValue];
}
