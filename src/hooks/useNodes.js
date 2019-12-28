import { useCallback, useState } from 'react'

const scale = ({
  node: { x, y },
  size: { width, height }
}) => ({
  x: width * x,
  y: height * y
})

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
