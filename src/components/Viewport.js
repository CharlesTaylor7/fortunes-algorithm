import React from 'react'
import './Viewport.css'
import useResizeAware from 'react-resize-aware'
import { Circle } from './svg/Circle'
import { Parabola } from './svg/Parabola'
import { Site } from './svg/Site'
import useNodes from '../hooks/useNodes'
import circumCircle from '../utilities/circumCircle'
import { parabolaBezier } from '../utilities/parabola'

export const Viewport = () => {
  const [ resizeListener, size ] = useResizeAware()
  const { onClick, nodes } = useNodes(size);

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
        {nodes.map((focus, i) =>
          <Site
            key={i}
            {...focus}
          />
        )}
        {nodes.map((focus, i) =>
          <Parabola
            key={i}
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
