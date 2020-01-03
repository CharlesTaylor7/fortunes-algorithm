import { useState, useEffect } from "react"
import usePrevious from "./usePrevious"

export default (initialValue) => {
  const [current, setValue] = useState(initialValue);
  console.log("current = " + current)

  const previous = usePrevious(current);
  console.log("previous = " + previous)
  const intervalLength = 500;
  const diff = current - previous;
  const frameCount = Math.abs(diff) / 10;
  const animationLength = frameCount * intervalLength;

  const [frame, setFrame] = useState(null);
  console.log("frame = " + frame)
  useEffect(
    () => {
      if (previous === undefined) return;
      const handle = setInterval(
        () => setFrame(i => i + 1),
        intervalLength
      );
      const stop = () => {
        clearInterval(handle);
        setFrame(null);
      }
      setTimeout(stop, animationLength);
      return stop;
    },
    [current]
  );

  const value = frame !== null && previous !== undefined
    ? previous + (frame * diff) / frameCount
    : current;
  console.log ("value = " + value)
  const animateValue = (value) => {
    setFrame(0)
    setValue(value);
  }

  const changeImmediately = (value) => setValue(value, 0)
  return [value, changeImmediately, animateValue];
}
