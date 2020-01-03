import React from 'react'
import './App.css'
import { Viewport } from './Viewport'
import Resizable from './utilities/Resizable'

export const App = () => {

  return (
    <div className="App">
      <Resizable>
        <Viewport />
      </Resizable>
    </div>
  )
}
