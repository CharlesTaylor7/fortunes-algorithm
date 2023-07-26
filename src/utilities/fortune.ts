import PriorityQueue from 'flatqueue'
import intersectParabolas from './intersectParabolas'

// Reference:
// https://pvigier.github.io/2018/11/18/fortune-algorithm-details.html
export type Event = { type: 'site'; siteIndex: number } | { type: 'circle' }

type BoundingBox = { height: number; width: number }

// https://en.wikipedia.org/wiki/Doubly_connected_edge_list
export class Diagram {
  sites: Array<Site> = []
  sweeplineX: number = 0
  beachline?: BeachNode
  queue: PriorityQueue<Event> = new PriorityQueue()
  boundingBox: BoundingBox = { height: 0, width: 0 }

  restart() {
    const locations = this.sites.map((s) => s.point)

    this.sites = []
    this.sweeplineX = 0
    this.queue = new PriorityQueue()

    for (let location of locations) {
      this.newSite(location)
    }
  }

  newSite(point: Point) {
    const site: Site = {
      index: this.sites.length,
      point: point,
    }
    this.sites.push(site)
    this.queue.push({ type: 'site', siteIndex: site.index }, point.x)
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
        current = current.next
        continue
      }
      const prevB = this.prevBreakpoint(current)
      if (prevB !== undefined && site.point.y < prevB) {
        current = current.prev
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

  nextBreakpoint(node: BeachNode): number | undefined {
    if (node.next) {
      return intersectParabolas(
        this.sites[node.siteIndex].point,
        this.sites[node.next.siteIndex].point,
        this.sweeplineX,
      )
    }
  }

  prevBreakpoint(node: BeachNode): number | undefined {
    if (node.prev) {
      return intersectParabolas(
        this.sites[node.prev.siteIndex].point,
        this.sites[node.siteIndex].point,
        this.sweeplineX,
      )
    }
  }
}

// TODO: balance these
class BeachNode {
  siteIndex: number
  next?: BeachNode
  prev?: BeachNode

  constructor(siteIndex: number) {
    this.siteIndex = siteIndex
  }
}

// each site node in the beachline is the focus of a parabola
///export type Beachline = BST<number, Site>;

export type Point = {
  x: number
  y: number
}

export type Site = {
  index: number
  point: Point
  edge?: HalfEdge
}

// DCEL
export type HalfEdge = {
  origin: Point
  twin: HalfEdge
  site: Site
  prev: HalfEdge
  next: HalfEdge
}
