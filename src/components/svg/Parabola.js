import React from 'react'
import { Path } from './Path'

export const Parabola = ({ start, control, end }) => (
  <>
    <Path
      color="black"
      path={`M ${start.x} ${start.y} Q ${control.x} ${control.y} ${end.x} ${end.y}`}
    />
  </>
)
