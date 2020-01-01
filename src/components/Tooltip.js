import React from 'react'
import './Tooltip.css'
import useResizeAware from 'react-resize-aware'

export const Tooltip = ({ cursor, viewportSize }) => {
  const [ resizeListener, tooltipSize ] = useResizeAware();
  const style = { left: cursor.x, top: cursor.y };

  if (cursor.y + tooltipSize.height > viewportSize.height) {
    style.top -= tooltipSize.height
  }
  if (cursor.x + tooltipSize.width > viewportSize.width) {
    style.left -= tooltipSize.width;
  }

  return (
    <div
      className="tooltip"
      style={style}
    >
      {resizeListener}
      <span className="coordinate">
        {`X = ${cursor.x.toFixed(0)}`}
      </span>
      <span className="coordinate">
        {`Y = ${cursor.y.toFixed(0)}`}
      </span>
    </div>
  )
}
