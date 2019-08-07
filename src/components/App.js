import React, { useEffect, useState } from 'react'
import './App.css'
import { useFrames } from '../hooks/useFrames'
import { Viewport } from './Viewport'
export const App = () => {
  const { frame, forward, backward, append } = useFrames();

  useEffect(() => {
    console.log(frame)
  }, [frame])

  useEffect(() => {
    document.onkeydown = (e) => {
      if (e.key === 'ArrowLeft') backward()
      else if (e.key === 'ArrowRight') forward()
      else append(e.key)
    }
  }, [forward, backward, append])

  return (
    <div className="App">
      <Viewport />
    </div>
  )
}
