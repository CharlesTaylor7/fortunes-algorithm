import React, { useState } from 'react'
import './Site.css'

type Props = {
  radius: number
  highlight: boolean
  onHover: (hover: boolean) => void
  x: number
  y: number
  label: string
}

Site.defaultProps = {
  radius: 4,
}

export function Site(props: Props) {
  return (
    <g transform={`translate(${props.x}, ${props.y})`}>
      <circle
        className="site"
        onMouseOver={() => props.onHover(true)}
        onMouseOut={() => props.onHover(false)}
        fill="black"
        r={props.highlight ? props.radius * 1.2 : props.radius}
        cx={0}
        cy={0}
      />
      <text className="site-label" x={4} y={-4}>
        {props.label}
      </text>
    </g>
  )
}
