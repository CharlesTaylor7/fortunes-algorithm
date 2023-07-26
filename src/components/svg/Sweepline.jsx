import React, { useState } from 'react'
import './Sweepline.css'

export const Sweepline = ({ x, height, onClick, selected }) => {
  const defaultColor = 'black'
  const highlighted = 'yellow'

  const defaultWidth = 2
  const hoveringWidth = 6
  const [width, setWidth] = useState(defaultWidth)

  return (
    <line
      className="sweepline"
      onMouseOver={() => setWidth(hoveringWidth)}
      onMouseOut={() => setWidth(defaultWidth)}
      onClick={onClick}
      stroke={selected ? highlighted : defaultColor}
      strokeWidth={width}
      x1={x}
      x2={x}
      y1={0}
      y2={height}
    />
  )
}
