import React, { useCallback } from 'react'

export const Site = ({ x, y }) => {

  const resetTransform = useCallback(
    (e) => {
      e.currentTarget.removeAttribute('transform')
    },
    []
  );

  const scaleBy = useCallback(
    (factor) => (e) => {
      const transform = `matrix(
          ${factor} 0
          0 ${factor}
          ${(1-factor)*x} ${(1-factor)*y}
        )`;
      e.currentTarget.setAttribute('transform', transform);
    },
    [x, y]
  );

  return (
    <circle
      className="site"
      onMouseOver={scaleBy(1.2)}
      onMouseOut={resetTransform}
      fill="black"
      r="4"
      cx={x}
      cy={y}
    />
  );
}
