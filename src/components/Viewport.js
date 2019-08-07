import React, { useState, useCallback, useRef } from 'react'
import './Viewport.css'

export const Viewport = () => {
  const [ nodes, setNodes ] = useState([])
  const ref = useRef(null)

  const onClick = useCallback(
    e => {
      const { nativeEvent: { offsetX: x, offsetY: y } } = e;
      const point = { x, y}
      console.log(point);
      setNodes(
        nodes => [
          ...nodes,
          point
        ]
      )
    },
    [setNodes]
  )
  if (ref.current) {
    console.log(ref.current)
  }
  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1000 1000"
      className="viewport"
      onClick={onClick}
    >
      {ref.current
        ? nodes.map((node, i) =>
          <circle
            key={i}
            r="10"
            cx={node.x * ref.current.style.width / 1000}
            cy={node.y * ref.current.style.height / 1000}
          />)
        : null
      }
    </svg>
  )
}