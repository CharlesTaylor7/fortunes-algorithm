import { useRef } from 'react'

export default (value) => {
  const ref = useRef({ past: null, buffer: null })
  const history = ref.current

  if (value !== history.buffer) {
    history.past = history.buffer
    history.buffer = value
  }

  return history.past
}
