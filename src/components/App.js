import React, { useEffect } from 'react'
import './App.css'
import { useFrames } from '../hooks/useFrames'
import { Viewport } from './Viewport'

export const App = () => {
  const { frame, forward, backward, append } = useFrames();

  useEffect(() => {
    document.onkeydown = (e) => {
      if (e.key === 'ArrowLeft') backward()
      else if (e.key === 'ArrowRight') forward()
    }
  }, [forward, backward, append])

  return (
    <div className="App">
      <Viewport />
    </div>
  )
}
