import { useState, useEffect } from "react"
import usePrevious from "./usePrevious"

export default (initialValue) => {
  const [current, setValue] = useState(initialValue);
  console.log("current = " + current)

  const previous = usePrevious(current);
  console.log("previous = " + previous)
  const [animationLength, setAnimationLength] = useState(5000);

  const diff = current - previous;
  const frameCount = 5;
  const [frame, setFrame] = useState(null);
  console.log("frame = " + frame)
  useEffect(
    () => {
      const handle = setInterval(
        () => setFrame(i => i + 1),
        animationLength / frameCount
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

  const value = frame !== null
    ? previous + (frame * diff) / frameCount
    : current;
  console.log ("value = " + value)
  const animateValue = (value, animationLength) => {
    setAnimationLength(animationLength)
    setValue(value);
  }

  const changeImmediately = (value) => setValue(value, 0)
  return [value, changeImmediately, animateValue];
}
