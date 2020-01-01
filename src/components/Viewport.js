import React, { useState, useCallback } from 'react'
import './Viewport.css'
import useResizeAware from 'react-resize-aware'
import { Parabola } from './svg/Parabola'
import { Site } from './svg/Site'
import useSites from '../hooks/useSites'
import { parabolaBezier } from '../utilities/parabola'
import { Tooltip } from './Tooltip'
import getOffsetFromCurrentTarget from '../utilities/getOffsetFromCurrentTarget'

export const Viewport = () => {
  const [ resizeListener, size ] = useResizeAware()
  const { onClick, sites } = useSites();
  const [ cursor, setCursor ] = useState(null);

  const directrix = size.width;
  const onMouseMove = useCallback(
    event => {
      event.preventDefault();
      const offset = getOffsetFromCurrentTarget(event);
      setCursor(offset);
    },
    [setCursor]
  );

  const onMouseLeave = useCallback(() => setCursor(null));
  return (
    <div
      className="viewport"
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {resizeListener}
      { cursor
        ? <Tooltip cursor={cursor} />
        : null
      }
      <svg
        className="svg"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
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
