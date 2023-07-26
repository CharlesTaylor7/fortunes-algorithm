import { useState, useEffect, useRef } from 'react'
import usePrevious from './usePrevious'

export default (initialValue) => {
  const [current, setValue] = useState(initialValue)
  const previous = usePrevious(current)
  const [frame, setFrame] = useState(null)
  const animationHandle = useRef(null)

  const diff = current - previous

  // milliseconds
  const intervalLength = 20

  // milliseconds per pixel
  const msPerPixel = 4

  const frameCount = Math.ceil((msPerPixel * Math.abs(diff)) / intervalLength)

  const stopAnimation = () => {
    clearInterval(animationHandle.current)
    setFrame(null)
  }

  if (frame === frameCount) {
    stopAnimation()
  }

  useEffect(() => {
    if (frame === null) return
    animationHandle.current = setInterval(() => setFrame((i) => i + 1), intervalLength)
    return stopAnimation
  }, [current])

  const value = frame !== null ? previous + (frame * diff) / frameCount : current

  const animateValue = (value) => {
    setFrame(0)
    setValue(value)
  }

  return [value, setValue, animateValue]
}
