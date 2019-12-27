import React from 'react'

export const Parabola = ({ start, control, end, focus, directrix }) => (
  <>
    <path
      stroke="blue"
      strokeWidth="2"
      fill="none"
      d={`M ${control.x} ${control.y} H ${focus.x}`}
    />
    <path
      stroke="black"
      strokeWidth="2"
      fill="none"
      d={`M ${start.x} ${start.y} Q ${control.x} ${control.y} ${end.x} ${end.y}`}
    />
    <path
      stroke="red"
      strokeWidth="2"
      fill="none"
      d={`M ${start.x} ${start.y} L ${control.x} ${control.y} L ${end.x} ${end.y}`}
    />
    <circle
      r="4"
      cx={control.x}
      cy={control.y}
      stroke="blue"
      strokeWidth="2"
      fill="blue"
    />
    <circle
      r="4"
      cx={focus.x}
      cy={focus.y}
      stroke="black"
      strokeWidth="2"
      fill="black"
    />
  </>
)
