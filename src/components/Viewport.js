import React from 'react'
import './Viewport.css'
import { Parabola } from './svg/Parabola'
import { Site } from './svg/Site'
import { parabolaBezier } from '../utilities/parabola'
import { Sweepline } from './svg/Sweepline'
import useViewport from '../hooks/useViewport'

export const Viewport = () => {
  const {
    sweeplineX,
    onClick,
    onClickSweepline,
    onMouseMove,
    viewportSize,
    viewportSizeListener,
    sweeplineDragging,
    sites,
  } = useViewport();
  return (
    <div
      className="viewport"
      onClick={onClick}
      onMouseMove={onMouseMove}
    >
      {viewportSizeListener}
      <svg
        className="svg"
        width="100%"
        height="100%"
      >
        <Sweepline
          x={sweeplineX}
          onClick={onClickSweepline}
          height={viewportSize.height}
          selected={sweeplineDragging}
        />
        {sites.map((site, i) =>
          <Site
            key={i}
            {...site}
          />
        )}
        {sites.map((focus, i) =>
          <Parabola
            key={i}
            {...parabolaBezier({
              focus,
              directrix: sweeplineX,
              y_range: [0, viewportSize.height],
            })}
          />
        )}

      </svg>
    </div>
  )
}
