import { useRef, useEffect } from 'react'

export default function usePrevious(value) {
  const ref = useRef({});

  if (value !== ref.current.buffer) {
    ref.current = { value: ref.current.buffer, buffer: value }
  }

  return ref.current.value;
}
