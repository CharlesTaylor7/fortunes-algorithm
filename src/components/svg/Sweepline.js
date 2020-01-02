import React, { useState } from 'react'

export const Sweepline = ({ x, height, onClick }) => {
  const defaultStroke = { color: 'black', width: 4 };
  const highlighted = { color: 'yellow', width: 6 };
  const [stroke, setStroke] = useState(defaultStroke);

  return (
    <line
      onMouseOver={() => setStroke(highlighted)}
      onMouseOut={() => setStroke(defaultStroke)}
      onClick={onClick}
      stroke={stroke.color}
      strokeWidth={stroke.width}
      x1={x}
      x2={x}
      y1={0}
      y2={height}
    />
  )
}
