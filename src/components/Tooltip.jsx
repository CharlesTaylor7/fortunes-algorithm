import React from 'react'
import './Tooltip.css'
import useResizeAware from 'react-resize-aware'

export const Tooltip = ({ cursor, viewportSize, sweeplineDragging }) => {
  const [resizeListener, tooltipSize] = useResizeAware()

  const margin = 20

  const tooltipHeight = tooltipSize.height + margin
  const tooltipWidth = tooltipSize.width + margin
  let offsetLeft = cursor.x
  let offsetTop = cursor.y

  if (cursor.y + tooltipHeight > viewportSize.height) {
    offsetTop -= tooltipHeight
  }
  if (cursor.x + tooltipWidth > viewportSize.width) {
    offsetLeft -= tooltipWidth
  }

  const format = (value) => Math.max(0, value).toFixed(0)
  return (
    <div
      className="tooltip"
      style={{
        left: offsetLeft,
        top: offsetTop,
        margin: `${margin}px`,
      }}
    >
      {resizeListener}
      <span className="coordinate">{`X = ${format(cursor.x)}`}</span>
      {sweeplineDragging ? null : <span className="coordinate">{`Y = ${format(cursor.y)}`}</span>}
    </div>
  )
}
