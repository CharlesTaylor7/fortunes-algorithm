import PriorityQueue from 'flatqueue'
import intersectParabolas from './intersectParabolas'

// Reference:
// https://pvigier.github.io/2018/11/18/fortune-algorithm-details.html
export type Event = { type: 'site', siteIndex: number } | { type: 'circle' }

export function voronoiDiagram(points: Array<Point>, box: BoundingBox): Diagram {
  let diagram = new Diagram(points, box)

  while (diagram.queue.length > 0) {
    diagram.step()
  }
  return diagram
}

type BoundingBox = {
  width: number
  height: number,
}
// https://en.wikipedia.org/wiki/Doubly_connected_edge_list
// DCEL
class Diagram {
  sites: Array<Site> = []
  sweeplineX: number = 0
  beachline?: BeachNode
  queue: PriorityQueue<Event> = new PriorityQueue()
  boundingBox: BoundingBox 

  constructor(points: Array<Point>, boundingBox: BoundingBox) {
    this.boundingBox = boundingBox
    for (let point of points) {
      const site: Site = {
        index: this.sites.length,
        point: point
      }
      this.sites.push(site)
      this.queue.push({ 'type': 'site', siteIndex: site.index }, point.x)
    }
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
      this.beachline = node;
      return
    }

    let current = this.beachline
    while (current) {
      return 
    }
  }

  nextBreakpoint(node: BeachNode): number | undefined {
    if (node.next) {
      return intersectParabolas(this.sites[node.siteIndex].point, this.sites[node.next.siteIndex].point, this.sweeplineX)
    }
  }

  prevBreakpoint(node: BeachNode): number | undefined {
    if (node.prev) {
      return intersectParabolas(this.sites[node.prev.siteIndex].point, this.sites[node.siteIndex].point, this.sweeplineX)
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

export type HalfEdge = {
  origin: Point
  twin: HalfEdge
  site: Site
  prev: HalfEdge,
  next: HalfEdge,
}
