import { useCallback, useState } from 'react'
import scale from '../utilities/scale'

export default (size) => {
  const [ normalizedNodes, setNodes ] = useState([]);
  const nodes = normalizedNodes.map(node => scale({ node, size }));

  const onClick = useCallback(
    e => {
      const { nativeEvent: { offsetX, offsetY } } = e;
      const { width, height } = size;
      const point = {
        x: Math.min(offsetX / width, 1),
        y: Math.min(offsetY / height, 1),
      };
      setNodes(ns => [...ns, point])
    },
    [size]
  )
  return { onClick, nodes };
}
