import { useCallback, useState } from 'react'
import getOffsetFromCurrentTarget from '../utilities/getOffsetFromCurrentTarget';

export default () => {
  const [ sites, setSites ] = useState([]);

  const onClick = useCallback(
    event => {
      const site = getOffsetFromCurrentTarget(event);
      setSites(ns => [...ns, site]);
    },
    []
  )
  return { onClick, sites };
}
