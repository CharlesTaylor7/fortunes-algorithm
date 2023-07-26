import React from 'react'
import type { MouseEventHandler } from 'react'

type Props = {
  strokeWidth: number
  color: string
  path: string
  onMouseOver: MouseEventHandler<SVGPathElement>
  onMouseOut: MouseEventHandler<SVGPathElement>
}

Path.defaultProps = {
  strokeWidth: 2,
}

export function Path(props: Props) {
  const { color, path, strokeWidth } = props
  return (
    <path
      onMouseOver={props.onMouseOver}
      onMouseOut={props.onMouseOut}
      fill="none"
      strokeWidth={strokeWidth}
      stroke={color}
      d={path}
    />
  )
}
