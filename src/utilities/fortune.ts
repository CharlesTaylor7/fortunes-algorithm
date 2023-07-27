import PriorityQueue from 'flatqueue'
import { intersect as intersectParabolas } from '@/utilities/parabola'
import type { IDiagram, IBeachNode, Site, HalfEdge, BoundingBox, Point, Event } from '@/utilities/types'

export { diagram as Diagram }
function diagram(): Diagram {
  return new Diagram()
}

// Reference:
// https://pvigier.github.io/2018/11/18/fortune-algorithm-details.html
class Diagram implements IDiagram {
  sites: Array<Site> = []
  sweeplineX: number = 0
  beachline?: IBeachNode
  queue: PriorityQueue<Event> = new PriorityQueue()
  bounds: BoundingBox = { height: 0, width: 0 }

  restart() {
    const locations = this.sites.map((s) => s.point)

    this.sites = []
    this.sweeplineX = 0
    this.beachline = undefined
    this.queue = new PriorityQueue()

    for (let location of locations) {
      this.newSite(location)
    }
  }

  newSite(point: Point, labelArg?: string): Site {
    const index = this.sites.length
    const label = labelArg || String.fromCharCode(index + 65)
    const site: Site = { label, point, index }
    this.sites.push(site)
    this.queue.push({ type: 'site', siteIndex: site.index }, point.x)
    return site
  }

  step() {
    const event = this.queue.pop()
    if (event === undefined) return
    if (event.type === 'site') {
      this.insertBeachNode(event.siteIndex)
    }
  }

  insertBeachNode(siteIndex: number) {
    const node = new BeachNode(siteIndex)
    const site = this.sites[siteIndex]
    this.sweeplineX = site.point.x
    if (this.beachline === undefined) {
      this.beachline = node
      return
    }

    let current = this.beachline
    while (true) {
      const nextB = this.nextBreakpoint(current)
      if (nextB !== undefined && site.point.y > nextB) {
        current = current.next!
        continue
      }
      const prevB = this.prevBreakpoint(current)
      if (prevB !== undefined && site.point.y < prevB) {
        current = current.prev!
        continue
      }
      break
    }

    // link node after current
    const oldNext = current.next
    current.next = node
    node.prev = current

    // link copy of current after the new node
    const copy = new BeachNode(current.siteIndex)
    node.next = copy
    copy.prev = node
    copy.next = oldNext
  }

  nextBreakpoint(node: IBeachNode): number | undefined {
    if (node.next) {
      return intersectParabolas(
        this.sites[node.siteIndex].point,
        this.sites[node.next.siteIndex].point,
        this.sweeplineX,
      )
    }
  }

  prevBreakpoint(node: IBeachNode): number | undefined {
    if (node.prev) {
      return intersectParabolas(
        this.sites[node.prev.siteIndex].point,
        this.sites[node.siteIndex].point,
        this.sweeplineX,
      )
    }
  }

  // nodejs only
  async toGraphiz() {
    let fs = await import('node:fs') 

  }

  *iterateBeachNodes(): Generator<IBeachNode> {
    let current = this.beachline
    while (current) {
      yield current
      current = current.next
    }
  }
}

// TODO: balance these
class BeachNode implements IBeachNode {
  siteIndex: number
  next?: IBeachNode
  prev?: IBeachNode

  constructor(siteIndex: number) {
    this.siteIndex = siteIndex
  }

  toJSON(): any {
    console.log("hello from toJSON")
    const { siteIndex } = this
    return { siteIndex }
  }
}
