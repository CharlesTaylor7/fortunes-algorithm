import { useState, useCallback, useEffect, useRef } from 'react'

export default function useResizeAware() {
  const ref = useRef()
  const [bounds, setBounds] = useState({})

  useEffect(() => {
    setBounds(ref.current.getBoundingClientRect())
    ref.current.addEventListener('resize', (e) => {
      setBounds(ref.current.getBoundingClientRect())
    })
  }, [setBounds, ref.current])
  return [ref, bounds]
}
