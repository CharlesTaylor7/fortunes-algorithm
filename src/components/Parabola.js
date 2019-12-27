import React from 'react'
import { parabolaPath } from '../utilities/parabola'

export const Parabola = ({ focus, viewportHeight }) => (
  <path
    d={parabolaPath({
      focus,
      directrix: 0,
      y_range: [0, viewportHeight]
    })}
  />
)
