import React from 'react'
import './Viewport.css'
import useResizeAware from 'react-resize-aware'
import { Circle } from './svg/Circle'
import { Parabola } from './svg/Parabola'
import useNodes from '../hooks/useNodes'
import circumCircle from '../utilities/circumCircle'
import { parabolaBezier } from '../utilities/parabola'

export const Viewport = () => {
  const [ resizeListener, size ] = useResizeAware()
  const { onClick, nodes } = useNodes(size);

  let circle;
  if (nodes.length === 3) {
    circle = circumCircle(...nodes);
  }

  return (
    <div
      className="viewport"
    >
      {resizeListener}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        onClick={onClick}
      >
        {circle
          ? <Circle {...circle} />
          : null
        }
        {nodes.map((focus, i) =>
          <Parabola
            key={i}
            focus={focus}
            directrix={0}
            {...parabolaBezier({
              directrix: 0,
              focus,
              size,
            })}
          />
        )}
      </svg>
    </div>
  )
}
