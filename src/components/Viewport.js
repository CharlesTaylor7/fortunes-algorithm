import React, { useState, useCallback } from 'react'
import './Viewport.css'
import useResizeAware from 'react-resize-aware'
import { Parabola } from './svg/Parabola'
import { Site } from './svg/Site'
import { parabolaBezier } from '../utilities/parabola'
import { Tooltip } from './Tooltip'
import getOffsetFromCurrentTarget from '../utilities/getOffsetFromCurrentTarget'
import { Shadow } from './svg/gradients/Shadow'
import { Sweepline } from './svg/Sweepline'

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

  const [sweeplineX, setSweeplineX] = useState(200);
  const [sweeplineSelected, setSweeplineSelected] = useState(false);
  const onClickSweepline = useCallback(
    event => {
      event.stopPropagation();
      setSweeplineSelected(!sweeplineSelected);
    },
    [sweeplineSelected, setSweeplineSelected]
  );

  const onMouseMove = useCallback(
    event => {
      const offset = getOffsetFromCurrentTarget(event);
      if (sweeplineSelected) {
        setSweeplineX(offset.x);
      }
      setCursor(offset);
    },
    [sweeplineSelected, setCursor, setSweeplineX]
  );
  const onMouseLeave = useCallback(() => setCursor(null), []);

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
        <Sweepline
          x={sweeplineX}
          onClick={onClickSweepline}
          height={size.height} />
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
              directrix: sweeplineX,
              y_range: [0, size.height],
            })}
          />
        )}

      </svg>
    </div>
  )
}
