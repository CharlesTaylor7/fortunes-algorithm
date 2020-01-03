import { useState, useEffect, useRef } from "react"
import usePrevious from "./usePrevious"

export default (initialValue) => {
  const [current, setValue] = useState(initialValue);
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
      if (previous === null || frame === null) {
        return;
      }
      animationHandle.current = setInterval(
        () => setFrame(i => i + 1),
        intervalLength
      );
      return stopAnimation;
    },
    [current]
  );

  const value = frame !== null
    ? previous + (frame * diff) / frameCount
    : current;

  const animateValue = (value) => {
    setFrame(0);
    setValue(value);
  };

  return [value, setValue, animateValue];
}
