import React from 'react'
import './Tooltip.css'
import useResizeAware from 'react-resize-aware'

export const Tooltip = ({ cursor, viewportSize, sweeplineDragging }) => {
  const [ resizeListener, tooltipSize ] = useResizeAware();
  const style = { left: cursor.x, top: cursor.y };

  if (cursor.y + tooltipSize.height > viewportSize.height) {
    style.top -= tooltipSize.height
  }
  if (cursor.x + tooltipSize.width > viewportSize.width) {
    style.left -= tooltipSize.width;
  }

  const format = (value) => Math.max(0, value).toFixed(0)
  return (
    <div
      className="tooltip"
      style={style}
    >
      {resizeListener}
      <span className="coordinate">
        {`X = ${format(cursor.x)}`}
      </span>
      {sweeplineDragging
        ? null
        : (
          <span className="coordinate">
            {`Y = ${format(cursor.y)}`}
          </span>
        )
      }
    </div>
  )
}
