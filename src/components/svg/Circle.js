import React from 'react'

export const Circle = ({ radius, center: {x, y} }) => (
  <circle
    stroke="black"
    fill="none"
    r={radius}
    cx={x}
    cy={y}
  />
)
