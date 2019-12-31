import React, { useState, useCallback } from 'react'
import './Viewport.css'
import useResizeAware from 'react-resize-aware'
import { Parabola } from './svg/Parabola'
import { Site } from './svg/Site'
import useSites from '../hooks/useSites'
import { parabolaBezier } from '../utilities/parabola'
import { Tooltip } from './Tooltip'


export const Viewport = () => {
  const [ resizeListener, size ] = useResizeAware()
  const { onClick, sites } = useSites();
  const [ cursor, setCursor ] = useState(null);

  const directrix = size.width;
  const onMouseMove = useCallback(
    event => {
      const { nativeEvent: { offsetX: x, offsetY: y }} = event;
      setCursor({ x, y })
    },
    [setCursor]
  );
  const onMouseLeave = () => setCursor(null)
  return (
    <div
      className="viewport"
    >
      {resizeListener}
      { cursor && cursor.x <= size.width && cursor.y <= size.height
        ? <Tooltip cursor={cursor} />
        : undefined
      }
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        onClick={onClick}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        {sites.map((site, i) =>
          <Site
            key={i}
            {...site}
          />
        )}
        {sites.map((focus, i) =>
          <Parabola
            key={i}
            {...parabolaBezier({
              focus,
              directrix,
              y_range: [0, size.height],
            })}
          />
        )}
      </svg>
    </div>
  )
}
