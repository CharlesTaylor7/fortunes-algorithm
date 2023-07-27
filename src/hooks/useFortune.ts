import type { RefObject, MouseEventHandler } from 'react'
import { useState, useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import { Map } from 'immutable'
import type { IDiagram, Site } from '@/utilities/types'
import { Diagram } from '@/utilities/fortune'
import getOffsetFromCurrentTarget from '@/utilities/getOffsetFromCurrentTarget'
import useAnimation from '@/hooks/useAnimation'
import useResizeAware from '@/hooks/useResizeAware'

export type MouseState = 'drag' | 'away'

export type SiteInfoMap = Map<number, SiteInfo>
export type SiteInfo = {
  label: string
  highlighted: boolean
}

export default function useFortune() {
  const [mouse, setMouse] = useState<MouseState>('away')
  const [diagram, rerender] = useDiagram()
  const [siteInfo, updateSites] = useState<SiteInfoMap>(Map())
  const [viewportRef, viewportBounds] = useResizeAware<HTMLDivElement>()
  const [vertexPlacementAllowed, setVertexPlacement] = useState(true)

  // callbacks
  const onClickSweepline: MouseEventHandler = useCallback(
    (event) => {
      setMouse((mouse) => (mouse === 'drag' ? 'away' : 'drag'))
    },
    [setMouse],
  )

  const onMouseMove: MouseEventHandler = useCallback(
    (event) => {
      if (mouse !== 'drag') return
      diagram.sweeplineX = getOffsetFromCurrentTarget(event).x
      rerender()
    },
    [mouse, rerender],
  )

  const onClick: MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      if (!vertexPlacementAllowed) return

      const point = getOffsetFromCurrentTarget(event)
      const site = diagram.newSite(point)
      updateSites((siteMap) =>
        siteMap.set(site.index, {
          label: site.label,
          highlighted: false,
        }),
      )
      rerender()
    },
    [vertexPlacementAllowed, rerender],
  )

  const onHover = useCallback(
    (siteIndex: number) => (hover: boolean) => {
      updateSites((siteMap) =>
        siteMap.update(siteIndex, { label: '', highlighted: false }, (info) => ({ ...info, highlighted: hover })),
      )
    },
    [updateSites],
  )

  // effects
  useLayoutEffect(() => {
    diagram.bounds = viewportBounds
  }, [viewportBounds])

  useEffect(() => {
    document.onkeydown = (e) => {
      console.log('key down', e.key)
      // next
      if (e.key === 'Enter') {
        setVertexPlacement(false)
        if (diagram.queue.length === 0) {
          diagram.sweeplineX = diagram.bounds.width
        } else {
          diagram.step()
        }
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
    mouse,
    diagram,
    viewportRef,
    onClick,
    onHover,
    onClickSweepline,
    onMouseMove,
    siteInfo,
  }
}

function useDiagram(): [IDiagram, () => void] {
  const [_, setDummy] = useState(0)
  const rerender = useCallback(() => setDummy((i) => i + 1), [setDummy])
  const diagramRef = useRef<IDiagram>(null!)
  if (!diagramRef.current) {
    diagramRef.current = Diagram()
  }

  return [diagramRef.current, rerender]
}
