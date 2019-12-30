import React from 'react'
import "./Tooltip.css"

export const Tooltip = ({ cursor }) => {
  return (
    <div
      className="tooltip"
      style={{ left: cursor.x, top: cursor.y }}
    >
      <span className="coordinate">
        {`X = ${cursor.x}`}
      </span>
      <span className="coordinate">
        {`Y = ${cursor.y}`}
      </span>
    </div>
  )
}
