import React from 'react'
import { Path } from './Path'

export const Directrix = ({ x, height }) => (
  <line
    color="black"
    stroke="black"
    strokeWidth="2"
    x1={x}
    x2={x}
    y1={0}
    y2={height}
  />
)
