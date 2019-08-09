import React, { useState, useCallback, useRef } from 'react'
import './Viewport.css'
import useResizeAware from 'react-resize-aware'

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
        {nodes.map((node, i) =>
          <circle
            key={i}
            r="4"
            cx={node.x * size.width}
            cy={node.y * size.height}
          />)
        }
      </svg>
    </div>
  )
}