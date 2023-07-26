import React, { useState } from 'react'
import { parabolaBezier } from '@/utilities/parabola'
import intersectParabolas from '@/utilities/intersectParabolas'

export const Beachline = ({ diagram }) => {
  return (
    <>
      {breakpoints(diagram).map(y => (
      <line
        strokeWidth={1}
        y1={y}
        y2={y}
        x1={0}
        x2={diagram.boundingBox.width}
      />))}
    </>
  )
}

function breakpoints(diagram) {
  let node = diagram.root;
  const breakpoints = []
  while (node && node.next) {
    breakpoints.push(intersectParabolas(node, node.next))
    node = node.next
  }
  return breakpoints
}
