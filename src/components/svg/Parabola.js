import React from 'react'
import { Point } from './Point'
import { Path } from './Path'

export const Parabola = ({ start, control, end, focus, directrix }) => (
  <>
    <Path
      color="blue"
      path={`M ${control.x} ${control.y} H ${focus.x}`}
    />
    <Path
      color="black"
      path={`M ${start.x} ${start.y} Q ${control.x} ${control.y} ${end.x} ${end.y}`}
    />
    <Path
      color="red"
      path={`M ${start.x} ${start.y} L ${control.x} ${control.y} L ${end.x} ${end.y}`}
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
