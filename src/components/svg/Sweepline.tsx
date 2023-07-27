import type { MouseEventHandler } from 'react'
import { useState } from 'react'
import type { MouseState } from '@/hooks/useFortune'


type Props = {
  x: number
  height: number
  mouse: MouseState
  onClick: MouseEventHandler,
}
Sweepline.defaultProps = {
  selected: undefined
}

export default function Sweepline (props: Props) {
  const { x, height } = props;
  const [ hover, setHover] = useState(false)
  return (
    <line
      className="sweepline"
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      onClick={props.onClick}
      stroke={props.mouse === 'drag' ? 'yellow' : 'black'}
      strokeWidth={hover ? 6 : 2 }
      x1={x}
      x2={x}
      y1={0}
      y2={height}
    />
  )
}
