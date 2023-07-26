import type { RefObject } from 'react'
import { useState, useCallback, useEffect, useRef } from 'react'
import type { IDiagram } from '@/utilities/types'
import { diagram } from '@/utilities/fortune'
import getOffsetFromCurrentTarget from '@/utilities/getOffsetFromCurrentTarget'
import useAnimation from '@/hooks/useAnimation'
import useResizeAware from '@/hooks/useResizeAware'


function useDiagram(): [IDiagram, () => void] {
  const [_, setDummy] = useState(0)
  const rerender = useCallback(() => setDummy((i) => i + 1), [setDummy])
  const diagramRef = useRef<IDiagram>(null!)
  if (!diagramRef.current) {
    diagramRef.current = diagram()
  }

  return [diagramRef.current, rerender]
}

export default () => {
  const [diagram, rerender] = useDiagram()
  const [viewportRef, viewportBounds] = useResizeAware()
  const [vertexPlacementAllowed, setVertexPlacement] = useState(true)
  const onClick = useCallback(
    (event: MouseEvent) => {
      if (!vertexPlacementAllowed) return
      const point = getOffsetFromCurrentTarget(event)
      console.log(point)
      diagram.newSite(point)
      rerender()
    },
    [vertexPlacementAllowed],
  )

  // effects
  useEffect(() => {
    diagram.bounds = viewportBounds
  }, [viewportBounds])

  useEffect(() => {
    document.onkeydown = (e) => {
      console.log('key down', e.key)
      // next
      if (e.key === 'Enter') {
        setVertexPlacement(false)
        diagram.step()
        rerender()
      }
      // reset
      if (e.key === 'r') {
        setVertexPlacement(true)
        diagram.restart()
        rerender()
      }
    }
  }, [])

  return {
    diagram,
    viewportBounds,
    viewportRef,
    onClick,
  }
}
