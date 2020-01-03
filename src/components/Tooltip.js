import React from 'react'
import './Tooltip.css'
import useResizeAware from 'react-resize-aware'

export const Tooltip = ({ cursor, viewportSize, sweeplineDragging }) => {
  const [ resizeListener, tooltipSize ] = useResizeAware();

  const margin = 20;
  const style = { left: cursor.x, top: cursor.y, margin: `${margin}px` };

  const tooltipHeight = tooltipSize.height + margin;
  const tooltipWidth = tooltipSize.width + margin;

  if (cursor.y + tooltipHeight > viewportSize.height) {
    style.top -= tooltipHeight;
  }
  if (cursor.x + tooltipWidth > viewportSize.width) {
    style.left -= tooltipWidth;
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
