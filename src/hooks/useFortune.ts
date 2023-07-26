import type { Ref } from 'react'
import { useState, useCallback, useEffect, useRef } from 'react'
import type { IDiagram } from '@/utilities/types'
import { diagram } from '@/utilities/fortune'
import getOffsetFromCurrentTarget from '@/utilities/getOffsetFromCurrentTarget'
import useAnimation from '@/hooks/useAnimation'
import useResizeAware from '@/hooks/useResizeAware'

type UseDiagramOutput = [Ref<IDiagram>, () => void]

function useDiagram(): UseDiagramOutput {
  const [_, setDummy] = useState(0)
  const rerender = useCallback(() => setDummy((i) => i + 1), [setDummy])
  const diagramRef = useRef<IDiagram>(null!)
  if (!diagramRef.current) {
    diagramRef.current = diagram()
  }

  return [diagramRef, rerender]
}

export default () => {
  const [diagramRef, rerender] = useDiagram()
  const [viewportRef, viewportBounds] = useResizeAware()
  const [vertexPlacementAllowed, setVertexPlacement] = useState(true)
  const onClick = useCallback(
    (event: MouseEvent) => {
      if (!vertexPlacementAllowed) return
      const point = getOffsetFromCurrentTarget(event)
      console.log(point)
      diagramRef.current.newSite(point)
      rerender()
    },
    [vertexPlacementAllowed],
  )

  // effects
  useEffect(() => {
    diagramRef.current.bounds = viewportBounds
  }, [viewportBounds])

  useEffect(() => {
    document.onkeydown = (e) => {
      console.log('key down', e.key)
      // next
      if (e.key === 'Enter') {
        setVertexPlacement(false)
        diagramRef.current.step()
        rerender()
      }
      // reset
      if (e.key === 'r') {
        setVertexPlacement(true)
        diagramRef.current.restart()
        rerender()
      }
    }
  }, [])

  return {
    diagram: diagramRef.current,
    viewportBounds,
    viewportRef,
    onClick,
  }
}
