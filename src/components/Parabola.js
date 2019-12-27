import React from 'react'

const Point = ({ color, x, y }) => (
  <circle
    stroke={color}
    fill={color}
    r="4"
    cx={x}
    cy={y}
  />
)

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
    <Point
      color="blue"
      x={control.x}
      y={control.y}
    />
    <Point
      color="green"
      x={(directrix + focus.x) / 2}
      y={focus.y}
    />
    <Point
      color="black"
      x={focus.x}
      y={focus.y}
    />
    <Point
      color="black"
      x={focus.x}
      y={focus.y}
    />
  </>
)
