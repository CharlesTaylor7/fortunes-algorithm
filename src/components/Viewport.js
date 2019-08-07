import React, { useState, useCallback, useRef } from 'react'
import './Viewport.css'

export const Viewport = () => {
  const [ nodes, setNodes ] = useState([])
  const ref = useRef(null)

  const getViewportDimensions = () => {
    if (!ref.current) return undefined
    return ref.current.getBoundingClientRect()
  }

  const onClick = useCallback(
    e => {
      const { nativeEvent: { offsetX, offsetY } } = e;
      const { width, height } = getViewportDimensions();
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
    [setNodes]
  )

  const box = getViewportDimensions();
  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      className="viewport"
      onClick={onClick}
    >
      {nodes.map((node, i) =>
        <circle
          key={i}
          r="4"
          cx={node.x * box.width}
          cy={node.y * box.height}
        />)
      }
    </svg>
  )
}