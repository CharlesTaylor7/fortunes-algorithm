import { useState, useCallback } from 'react'

export const useFrames = (initialFrames) => {

  const [frameIndex, setFrameIndex] = useState(0);
  const [frames, setFrames] = useState(initialFrames || []);

  const forward = useCallback(() =>
    setFrameIndex(i => Math.min(i+1, frames.length-1))
    , [frames.length]);

  const backward = useCallback(() =>
    setFrameIndex(i => Math.max(i-1, 0))
  , []);

  const append = useCallback((frame) =>
    setFrames(frames => [...frames, frame ])
  , []);

  const frame = frames[frameIndex];

  return { frameIndex, forward, backward, frame, append }
}