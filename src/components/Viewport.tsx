import React from 'react'
import './Viewport.css'
import Beachline from '@/components/svg/Beachline'
import Sweepline from '@/components/svg/Sweepline'
import { Site } from './svg/Site'
import { parabolaBezier } from '../utilities/parabola'
import useFortune from '../hooks/useFortune'

export function Viewport() {
  const hook = useFortune()
  const { diagram, onClick, viewportRef, siteInfo, onHover } = hook
  return (
    <div className="viewport" ref={viewportRef} onClick={onClick} onMouseMove={hook.onMouseMove}>
      <svg className="svg" width="100%" height="100%">
        <Sweepline
          mouse={hook.mouse}
          onClick={hook.onClickSweepline}
          x={diagram.sweeplineX}
          height={diagram.bounds.height}
        />
        {diagram.sites.map((site, i) => {
          const info = siteInfo.get(site.index)!
          return (
            <Site
              key={i}
              label={info.label}
              highlight={info.highlighted}
              onHover={onHover(site.index)}
              {...site.point}
            />
          )
        })}
        <Beachline diagram={diagram} siteInfo={siteInfo} onHover={onHover} />
      </svg>
    </div>
  )
}
