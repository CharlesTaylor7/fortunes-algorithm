import React from 'react'
import { parabolaPath } from '../utilities/parabola'

export const Parabola = ({ focus, viewportHeight }) => (
  <path
    stroke="black"
    strokeWidth="2"
    fill="none"
    d={parabolaPath({
      focus,
      directrix: 0,
      y_range: [0, viewportHeight]
    })}
  />
)
