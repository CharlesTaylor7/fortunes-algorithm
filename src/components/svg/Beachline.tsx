import React, { useState } from 'react'
import { Parabola } from '@/components/svg/Parabola'
import type { IDiagram, IBeachNode, Point, Bezier } from '@/utilities/types'
import { parabolaBezier, parabola, intersect as intersectParabolas } from '@/utilities/parabola'

type Props = {
  diagram: IDiagram
}
export default function Beachline(props: Props) {
  const { diagram } = props
  return (
    <>
      {beziers(diagram).map((props, i) => (
        <Parabola key={i} {...props} />
      ))}
    </>
  )
}

function loc(diagram: IDiagram, node: IBeachNode): Point {
  return diagram.sites[node.siteIndex].point
}

function beziers(diagram: IDiagram): Array<Bezier> {
  let node = diagram.beachline
  const beziers: Array<Bezier> = []
  const directrix = diagram.sweeplineX
  while (node) {
    const [curve, _] = parabola({ focus: loc(diagram, node), directrix})
    let start: number = 0
    let end: number = diagram.bounds.height

    if (node.prev) {
      start = intersectParabolas(loc(diagram, node.prev), loc(diagram, node), directrix)
    } 

    if (node.next) {
      end = intersectParabolas(loc(diagram, node), loc(diagram, node.next), directrix)
    } 

    beziers.push(parabolaBezier({ 
      y_range: [start, end],
      focus: loc(diagram, node), 
      directrix,
    }))

    node = node.next
  }
  return beziers
}
