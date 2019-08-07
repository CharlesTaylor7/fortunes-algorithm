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
  let nodeItems = [];
  if (ref.current) {
    const { width, height } = ref.current.getBoundingClientRect()
    console.log(width)
    console.log(height)
    nodeItems = nodes.map((node, i) =>
      <circle
        key={i}
        r="4"
        cx={node.x}
        cy={node.y}
      />)
  }
  return (
    <div
      ref={ref}
      className="viewport"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        // viewBox="113 128 972 600"
        // preserveAspectRatio="xMidYMid meet"
        // viewBox="0 0 1000 1000"
        // preserveAspectRatio="none"
      >
        {nodeItems}
      </svg>
    </div>
  )
}