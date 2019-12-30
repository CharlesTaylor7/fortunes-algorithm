import { useCallback, useState } from 'react'

export default () => {
  const [ sites, setSites ] = useState([]);

  const onClick = useCallback(
    e => {
      const { nativeEvent: { offsetX, offsetY } } = e;
      const site = {
        x: offsetX,
        y: offsetY,
      };
      setSites(ns => [...ns, site]);
    },
    []
  )
  return { onClick, sites };
}
