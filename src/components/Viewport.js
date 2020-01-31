import React from 'react'
import './Viewport.css'

export const Viewport = () => {
  const opacity = 0.5;
  return (
    <div
      className="viewport"
    >
      <svg
        className="svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="midXmidY meet"
      >
        <defs>
          <filter id="filter">
            <feComponentTransfer>
              <feFuncA type="table" tableValues={`0 ${opacity} ${opacity}`} />
            </feComponentTransfer>
          </filter>
        </defs>
        <g
          filter="url(#filter)"
        >
          <path d="M 0 0 L 100 100" stroke="grey" stroke-width="2" opacity="0.5" />
          <path d="M 100 0 L 0 100" stroke="grey" stroke-width="2" opacity="0.5"/>
        </g>
      </svg>
    </div>
  )
}
