import { Ref, useState, useCallback, useEffect, useRef } from 'react'
import type { BoundingBox } from '@/utilities/types'

export default function useResizeAware<T extends HTMLElement>(): [Ref<T>, BoundingBox] {
  const ref = useRef<T>(null)

  const [bounds, setBounds] = useState<BoundingBox>({ height: 0, width: 0 })

  useEffect(() => {
    const targetEl = ref.current
    if (!targetEl) {
      console.error('useResizeAware ref is not bound to any mounted react component')
      return
    }
    setBounds(rectToBounds(targetEl))
    const observer = new ResizeObserver(() => {
      setBounds(rectToBounds(targetEl))
    })
    observer.observe(targetEl)
    return () => observer.unobserve(targetEl)
  }, [setBounds])
  return [ref, bounds]
}

function rectToBounds(target: HTMLElement): BoundingBox {
  const domRect = target.getBoundingClientRect()
  return { height: domRect.height, width: domRect.width }
}
