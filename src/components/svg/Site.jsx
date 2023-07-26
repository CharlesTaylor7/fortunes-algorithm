import React, { useState } from 'react'

export const Site = ({ x, y }) => {
  const defaultRadius = 4
  const [radius, setRadius] = useState(defaultRadius)

  return (
    <circle
      className="site"
      onMouseOver={() => setRadius(defaultRadius * 1.2)}
      onMouseOut={() => setRadius(defaultRadius)}
      fill="black"
      r={radius}
      cx={x}
      cy={y}
    />
  )
}
