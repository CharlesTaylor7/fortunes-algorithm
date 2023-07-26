import { useState, useCallback, useEffect, useRef } from 'react'
import { Diagram } from '../utilities/fortune'
import getOffsetFromCurrentTarget from '../utilities/getOffsetFromCurrentTarget'
import useAnimation from '../hooks/useAnimation'
import useResizeAware from 'react-resize-aware'

function useDiagram() {
  const [_, setDummy] = useState(0);
  const rerender = useCallback(() => setDummy(i => i + 1), [setDummy])
  const diagramRef = useRef()
  if (!diagramRef.current) {
    diagramRef.current = new Diagram()
  }

  return [diagramRef, rerender]
}

export default () => {
  const [ diagramRef, rerender ] = useDiagram()
  const [ viewportSizeListener, viewportSize ] = useResizeAware();
  const [ vertexPlacementAllowed, setVertexPlacement ] = useState(true)
  const onClick = useCallback(
    event => {
      if (!vertexPlacementAllowed) return
      const point = getOffsetFromCurrentTarget(event);
      console.log(point)
      diagramRef.current.newSite(point)
      rerender()
    },
    [vertexPlacementAllowed]
  );

  // effects
  useEffect(() => {
    diagramRef.current.boundingBox = viewportSize
  }, [viewportSize])

  useEffect(() => {
    document.onkeydown = (e) => {
      console.log("key down", e.key)
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
    viewportSize,
    viewportSizeListener,
    onClick,
  };
}
