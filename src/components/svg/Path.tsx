import React from 'react'
import type { MouseEventHandler } from 'react'

type Props = {
  strokeWidth: number
  color: string
  path: string
  onMouseOver: MouseEventHandler<SVGPathElement>
  onMouseOut: MouseEventHandler<SVGPathElement>
  transform: string
}

Path.defaultProps = {
  strokeWidth: 2,
  transform: "",
}

export function Path(props: Props) {
  const { color, path, strokeWidth } = props
  return (
    <path
      transform={props.transform}
      onMouseOver={props.onMouseOver}
      onMouseOut={props.onMouseOut}
      fill="none"
      strokeWidth={strokeWidth}
      stroke={color}
      d={path}
    />
  )
}
