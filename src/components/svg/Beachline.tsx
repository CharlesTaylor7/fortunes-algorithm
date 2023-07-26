import React, { useState } from 'react'
import type { SiteInfoMap } from '@/hooks/useFortune'

import { Parabola } from '@/components/svg/Parabola'
import type { IDiagram, IBeachNode, Point, Bezier } from '@/utilities/types'
import { parabolaBezier, parabola, intersect as intersectParabolas } from '@/utilities/parabola'

type Props = {
  diagram: IDiagram
  onHover: (siteIndex: number) => (hover: boolean) => void
  siteInfo: SiteInfoMap
}
export default function Beachline(props: Props) {
  return (
    <>
      {beachSegments(props.diagram).map((segment, i) => {
        const info = props.siteInfo.get(segment.siteIndex)!
        return (
          <Parabola
            key={i}
            highlight={info.highlighted}
            siteLabel={info.label}
            onHover={props.onHover(segment.siteIndex)}
            {...segment.bezier}
          />
        )
      })}
    </>
  )
}

function loc(diagram: IDiagram, node: IBeachNode): Point {
  return diagram.sites[node.siteIndex].point
}

type BeachSegment = {
  bezier: Bezier
  siteIndex: number
}
function beachSegments(diagram: IDiagram): Array<BeachSegment> {
  let node = diagram.beachline
  const beziers: Array<BeachSegment> = []
  const directrix = diagram.sweeplineX
  while (node) {
    const [curve, _] = parabola({ focus: loc(diagram, node), directrix })
    let start: number = 0
    let end: number = diagram.bounds.height

    if (node.prev) {
      start = intersectParabolas(loc(diagram, node.prev), loc(diagram, node), directrix)
    }

    if (node.next) {
      end = intersectParabolas(loc(diagram, node), loc(diagram, node.next), directrix)
    }

    if (start > end) {
      /* 
      console.error(
        'start exceeds end',
         {
          next: node.next && loc(diagram, node.next),
          prev: node.prev && loc(diagram, node.prev),
          focus: loc(diagram, node),
        }
      )
      */
    }
    beziers.push({
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
