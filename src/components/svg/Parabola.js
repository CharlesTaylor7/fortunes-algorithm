import React from 'react'
import { Point } from './Point'
import { Path } from './Path'

export const Parabola = ({ start, control, end, focus, directrix }) => (
  <>
    {/* <Path
      color="black"
      path={`M ${start.x} ${start.y} Q ${control.x} ${control.y} ${end.x} ${end.y}`}
    /> */}
    <Point
      color="black"
      x={focus.x}
      y={focus.y}
    />
  </>
)
