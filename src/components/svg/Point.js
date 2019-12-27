import React from 'react'

export const Point = ({ color, x, y }) => (
  <circle
    stroke={color}
    fill={color}
    r="4"
    cx={x}
    cy={y}
  />
)
