import React, { useState, useCallback } from 'react'
import './Viewport.css'
import useResizeAware from 'react-resize-aware'
import { getX } from '../parabola'

const range = function* (n) {
  for (let i = 0; i < n; i++) {
    yield i;
  }
}
const Node = ({x, y}) => (
  <circle
    r="4"
    cx={x}
    cy={y}
  />
);

export const Viewport = () => {
  const [ resizeListener, size ] = useResizeAware()
  const [ nodes, setNodes ] = useState([])

  const onClick = useCallback(
    e => {
      const { nativeEvent: { offsetX, offsetY } } = e;
      const { width, height } = size;
      const point = {
        x: Math.min(offsetX / width, 1),
        y: Math.min(offsetY / height, 1),
      };
      setNodes(
        nodes => [
          ...nodes,
          point
        ]
      )
    },
    [setNodes, size]
  )
  const sizedNodes = nodes.map(({x, y}) => ({
    x: size.width * x,
    y: size.height * y,
  }))

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
        {sizedNodes.map(({x, y}, i) => (
          <Node
            key={i}
            x={x}
            y={y}
          />
        ))}
        {sizedNodes.flatMap((focus) => {
          const f = getX({focus, directrix: 0})
          return Array.from(range(11)).map(i => ({
            x: f(size.height * i / 10),
            y: (size.height * i / 10)
          })
        )}).map(({x, y}, i) => (
          <Node
            key={`p${i}`}
            x={x}
            y={y}
          />
        ))
        }
      </svg>
    </div>
  )
}