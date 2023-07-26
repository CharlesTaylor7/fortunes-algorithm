import React, { useState } from 'react'

type Props = {
  radius: number
  highlight: boolean
  setHover: (hover: boolean) => void
  x: number
  y: number
}

Site.defaultProps = {
  radius: 4,
}

export function Site(props: Props) {
  return (
    <circle
      className="site"
      onMouseOver={() => props.setHover(true)}
      onMouseOut={() => props.setHover(false)}
      fill="black"
      r={props.highlight ? props.radius * 1.2 : props.radius}
      cx={props.x}
      cy={props.y}
    />
  )
}
