import React from 'react'
import './Viewport.css'
import useResizeAware from 'react-resize-aware'
import { Circle } from './svg/Circle'
import { Parabola } from './svg/Parabola'
import { Site } from './svg/Site'
import useNodes from '../hooks/useNodes'
import circumCircle from '../utilities/circumCircle'
import { parabolaBezier } from '../utilities/parabola'
import * as R from 'ramda'
import intersectParabolas from '../utilities/intersectParabolas'

export const Viewport = () => {
  const [ resizeListener, size ] = useResizeAware()
  const { onClick, nodes } = useNodes(size);

  const directrix = size.width;
  const bounds = R.pipe(
    R.aperture(2),
    R.map(([n1, n2]) => intersectParabolas(n1, n2, directrix)),
    R.prepend(0),
    R.append(size.height),
  )(nodes);

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
              focus,
              directrix,
              y_range: [bounds[i], bounds[i + 1]],
            })}
          />
        )}
      </svg>
    </div>
  )
}
