import React, { useState, useCallback } from 'react'
import './Viewport.css'
import useResizeAware from 'react-resize-aware'
import Parabola from './Parabola'
import useNodes from '../hooks/useNodes'
import { parabolaBezier } from '../utilities/parabola'

const Node = ({x, y}) => (
  <circle
    r="4"
    cx={x}
    cy={y}
  />
);

export const Viewport = () => {
  const [ resizeListener, size ] = useResizeAware()
  const { onClick, nodes } = useNodes(size);

  return (
    <div
      className="viewport"
    >
      {resizeListener}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        onClick={onClick}
      >
        {nodes.map(({x, y}, i) => (
          <Node
            key={i}
            x={x}
            y={y}
          />
        ))}
        {nodes.map((focus, i) =>
          <Parabola
            key={i}
            {...parabolaBezier({
              focus,
              directrix: 0,
              y_range: [0, size.height]
            })}
          />
        )}
      </svg>
    </div>
  )
}
