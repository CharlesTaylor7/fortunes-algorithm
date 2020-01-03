import { useRef, useEffect } from 'react'

export default function usePrevious(value) {
  const ref = useRef({});

  useEffect(() => {
    ref.current = { value: ref.current.buffer, buffer: value }
  }, [value]);

  return ref.current.value;
}
