import { useState } from 'react'
import type { Bezier as BezierType } from '@/utilities/types'
import { Path } from '@/components/svg//Path'

type Props = BezierType & {
  highlight: boolean
  onHover: (hover: boolean) => void
  label: string
}

export default function Bezier(props: Props) {
  const { start, control, end } = props
  const [highlight, onHover] = useState(false)

  return (
    <g
      transform={`translate(${control.x}, ${control.y})`}
    >
      <Path
        strokeWidth={highlight ? 4 : 2}
        onMouseOver={() => onHover(true)}
        onMouseOut={() => onHover(false)}
        color="black"
        path={`M ${start.x} ${start.y} Q ${control.x} ${control.y} ${end.x} ${end.y}`}
        transform={`translate(${-control.x}, ${-control.y})`}
      />
      <text
        onMouseOver={() => onHover(true)}
        onMouseOut={() => onHover(false)}
      >
        {props.label}
      </text>
    </g>
  )
}
