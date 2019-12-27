import React from 'react'
import './Viewport.css'
import useResizeAware from 'react-resize-aware'
import { Parabola } from './svg/Parabola'
import useNodes from '../hooks/useNodes'
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
          <Parabola
            key={i}
            focus={focus}
            directrix={0}
            {...parabolaBezier({
              focus,
              directrix: 0,
              y_range: [0, size.height]
            })}
          />
        )}
      </svg>
    </div>
  )
}
