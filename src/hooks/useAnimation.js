import { useState, useEffect, useRef } from "react"
import usePrevious from "./usePrevious"

export default (initialValue) => {
  const [current, animateValue] = useState(initialValue);
  const animationHandle = useRef(null);

  console.log("current = " + current)

  const previous = usePrevious(current);
  console.log("previous = " + previous)
  const intervalLength = 10;
  const diff = current - previous;
  const frameCount = Math.abs(diff);
  const animationLength = frameCount * intervalLength;

  const [frame, setFrame] = useState(null);
  console.log("frame = " + frame)

  const stopAnimation = () => {
    setFrame(null)
    clearInterval(animationHandle.current);
  };

  if (frame === frameCount) {
    stopAnimation();
  }

  useEffect(
    () => {
      setFrame(0);
      if (previous === undefined) return;

      animationHandle.current = setInterval(
        () => setFrame(i => i + 1),
        intervalLength
      );
      return stopAnimation;
    },
    [current]
  );

  const value = frame !== null && previous !== undefined
    ? previous + (frame * diff) / frameCount
    : current;
  console.log ("value = " + value)

  return [value, animateValue];
}
