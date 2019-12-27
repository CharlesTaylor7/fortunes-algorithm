import React from 'react'

export default ({ start, control, end }) => (
  <path
    stroke="black"
    strokeWidth="2"
    fill="none"
    d={`M ${start.x} ${start.y} Q ${control.x} ${control.y} ${end.x} ${end.y}`}
  />
)
