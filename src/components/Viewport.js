import React from 'react'
import './Viewport.css'
import { Parabola } from './svg/Parabola'
import { Beachline } from './Beachline'
import { Site } from './svg/Site'
import { parabolaBezier } from '../utilities/parabola'
import { Sweepline } from './svg/Sweepline'
import useFortune from '../hooks/useFortune'

export const Viewport = () => {
  const {
    diagram,
    onClick,
    viewportSize,
    viewportSizeListener,
  } = useFortune();
  return (
    <div
      className="viewport"
      onClick={onClick}
    >
      {viewportSizeListener}
      <svg
        className="svg"
        width="100%"
        height="100%"
      >
        <Sweepline
          x={diagram.sweeplineX}
          height={viewportSize.height}
        />
        {diagram.sites.map((site, i) =>
          <Site
            key={i}
            {...site.point}
          />
        )}
        {diagram.sites.map((site, i) =>
          <Parabola
            key={i}
            {...parabolaBezier({
              focus: site.point,
              directrix: diagram.sweeplineX,
              y_range: [0, viewportSize.height],
            })}
          />
        )}
        <Beachline diagram={diagram} />
      </svg>
    </div>
  )
}
