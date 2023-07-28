import React, { useState } from 'react'
import type { SiteInfoMap } from '@/hooks/useFortune'

import { Site } from '@/components/svg/Site'
import Bezier from '@/components/svg/Bezier'
import type { IDiagram, IBeachNode, Point, Bezier as BezierType } from '@/utilities/types'
import { parabolaBezier, parabola, intersect as intersectParabolas } from '@/utilities/parabola'

type Props = {
  diagram: IDiagram
  onHover: (siteIndex: number) => (hover: boolean) => void
  siteInfo: SiteInfoMap
}

export default function Debug(props: Props) {
  function bezierPoints(site: any) {
    return parabolaBezier({
      focus: site.point,
      y_range: [0, props.diagram.bounds.height],
      directrix: props.diagram.sweeplineX,
    })
  }
  return (
    <>
      {props.diagram.sites.map((site, i) => (
        <Bezier key={`bezier-${i}`} label={site.label} {...bezierPoints(site)} />
      ))}
      {breakpoints(props.diagram).map((b, i) => (
        //<Site key={i} {...b} />
        <line data-label={b.label} stroke="black" key={i} x1="0" x2={props.diagram.sweeplineX} y1={b.y} y2={b.y} />
      ))}
    </>
  )
}

function Beachline(props: Props) {
  return (
    <>
      {beachSegments(props.diagram).map((segment, i) => {
        const info = props.siteInfo.get(segment.siteIndex)!
        return (
          <Bezier
            key={i}
            highlight={info.highlighted}
            label={segment.label}
            onHover={props.onHover(segment.siteIndex)}
            {...segment.bezier}
          />
        )
      })}
    </>
  )
}

type Breakpoint = {
  label: string
  y: number
}
function breakpoints(diagram: IDiagram): Array<Breakpoint> {
  let node = diagram.beachline
  const breakpoints: Array<Breakpoint> = []
  const directrix = diagram.sweeplineX
  while (node) {
    const [curve, _] = parabola({ focus: loc(diagram, node), directrix })

    let start = diagram.prevBreakpoint(node)
    if (start !== undefined) {
      breakpoints.push({ label: `${node.label}-${node.next?.label}`, y: start })
    }

    let end = diagram.nextBreakpoint(node)
    if (end !== undefined) {
      breakpoints.push({ label: `${node.prev?.label}-${node.label}`, y: end })
    }

    node = node.next
  }
  return breakpoints
}

function loc(diagram: IDiagram, node: IBeachNode): Point {
  return diagram.sites[node.siteIndex].point
}

type BeachSegment = {
  bezier: BezierType
  label: string
  siteIndex: number
}

function beachSegments(diagram: IDiagram): Array<BeachSegment> {
  let node = diagram.beachline
  const beziers: Array<BeachSegment> = []
  const directrix = diagram.sweeplineX
  while (node) {
    const [curve, _] = parabola({ focus: loc(diagram, node), directrix })

    let start: number = diagram.prevBreakpoint(node) || 0
    let end: number = diagram.nextBreakpoint(node) || diagram.bounds.height

    if (start > end) {
      console.error('start exceeds end', {
        start,
        end,
        next: node.next && loc(diagram, node.next),
        prev: node.prev && loc(diagram, node.prev),
        focus: loc(diagram, node),
      })
    }

    beziers.push({
      label: node.label,
      siteIndex: node.siteIndex,
      bezier: parabolaBezier({
        y_range: [start, end],
        focus: loc(diagram, node),
        directrix,
      }),
    })
    const b = beziers[beziers.length - 1]

    node = node.next
  }
  return beziers
}
