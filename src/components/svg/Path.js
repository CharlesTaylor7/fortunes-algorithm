import React from 'react'

export const Path = ({ color, path }) => (
  <path
    fill="none"
    strokeWidth="2"
    stroke={color}
    d={path}
  />
)
