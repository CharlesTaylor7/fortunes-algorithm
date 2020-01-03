import { useState, useEffect, useRef } from "react"
import usePrevious from "./usePrevious"

export default (initialValue) => {
  const [current, animateValue] = useState(initialValue);
  const animationHandle = useRef(null);

  const previous = usePrevious(current);
  const diff = current - previous;

  // pixels per second
  const speed = 30;
  const fps = 60;

  const frameCount = Math.ceil(fps * Math.abs(diff) / speed);
  const intervalLength = 1 / frameCount;

  const [frame, setFrame] = useState(null);

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

  console.log("current = " + current)
  console.log("previous = " + previous)
  console.log("frame = " + frame)
  console.log ("value = " + value)

  return [value, animateValue];
}
