import React from 'react'
import type { Bezier } from '@/utilities/types'
import { Path } from '@/components/svg//Path'

type Props = Bezier & {
  highlight: boolean
  onHover: (hover: boolean) => void
  siteLabel: string
}

export function Parabola(props: Props) {
  const { start, control, end, highlight } = props
  function onHover(hover: boolean) {
    props.onHover(hover)
    console.log('site', props.siteLabel)
    console.log('start', start)
    console.log('end', end)
  }

  return (
    <Path
      strokeWidth={highlight ? 4 : 2}
      onMouseOver={() => onHover(true)}
      onMouseOut={() => onHover(false)}
      color="black"
      path={`M ${start.x} ${start.y} Q ${control.x} ${control.y} ${end.x} ${end.y}`}
    />
  )
}
