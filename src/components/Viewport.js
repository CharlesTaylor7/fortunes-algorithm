import React, { useState, useCallback } from 'react'
import './Viewport.css'
import useResizeAware from 'react-resize-aware'
import { Parabola } from './svg/Parabola'
import { Site } from './svg/Site'
import { parabolaBezier } from '../utilities/parabola'
import { Tooltip } from './Tooltip'
import getOffsetFromCurrentTarget from '../utilities/getOffsetFromCurrentTarget'
import { Shadow } from './svg/gradients/Shadow'

export const Viewport = () => {
  const [ resizeListener, size ] = useResizeAware();
  const [ cursor, setCursor ] = useState(null);
  const [ sites, setSites ] = useState([]);

  const onClick = useCallback(
    event => {
      const site = getOffsetFromCurrentTarget(event);
      setSites(ns => [...ns, site]);
    },
    []
  );
  const onMouseMove = useCallback(
    event => {
      event.preventDefault();
      const offset = getOffsetFromCurrentTarget(event);
      setCursor(offset);
    },
    [setCursor]
  );
  const onMouseLeave = useCallback(() => setCursor(null), []);

  const directrix = size.width;

  return (
    <div
      className="viewport"
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {resizeListener}
      { cursor
        ? <Tooltip cursor={cursor} viewportSize={size} />
        : null
      }
      <svg
        className="svg"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <Shadow />
        </defs>
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
