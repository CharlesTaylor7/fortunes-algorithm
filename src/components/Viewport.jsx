import React from 'react'
import './Viewport.css'
import { Parabola } from './svg/Parabola'
import Beachline from '@/components/svg/Beachline'
import { Site } from './svg/Site'
import { parabolaBezier } from '../utilities/parabola'
import { Sweepline } from './svg/Sweepline'
import useFortune from '../hooks/useFortune'

export const Viewport = () => {
  const { diagram, onClick, viewportRef, viewportBounds, siteInfo, onHover } = useFortune()
  return (
    <div className="viewport" ref={viewportRef} onClick={onClick}>
      <svg className="svg" width="100%" height="100%">
        <Sweepline x={diagram.sweeplineX} height={viewportBounds.height} />
        {diagram.sites.map((site, i) => (
          <Site
            key={i}
            highlight={siteInfo.get(site.index)?.highlighted || false}
            onHover={onHover(site.index)}
            {...site.point}
          />
        ))}
        <Beachline diagram={diagram} siteInfo={siteInfo} onHover={onHover} />
      </svg>
    </div>
  )
}
