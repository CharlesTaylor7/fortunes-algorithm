import PriorityQueue from 'flatqueue'
import { BST } from '@/utilities/binary-search-tree'

// Reference:
// https://pvigier.github.io/2018/11/18/fortune-algorithm-details.html
export type Event = { type: 'site', site: Point } | { type: 'circle' }

export function voronoiDiagram(sites: Array<Point>): Diagram {
  let queue: PriorityQueue<Event> = new PriorityQueue()
  for (let site of sites) {
    queue.push({ 'type': 'site', site }, site.x)
  }
  while (queue.length > 0) {
    const event = queue.pop()
    if (event === undefined) {
      throw new Error();
    }
    if (event.type === 'site') {

    }
  }

  let diagram = {
    sites: [],
    cells: [],
    vertices: [],
    edges: [],
  }

  return diagram
}

// data definitions are linked structures based on:
// https://pvigier.github.io/2018/11/18/fortune-algorithm-details.html#diagram-data-structure
// Time will tell if this can't be simplified
export type Diagram = {
  sites: Array<Point> 
  cells: Array<Cell>
  vertices: Array<Point>
  edges: Array<Edge>
}

// each site node in the beachline is the focus of a parabola
export type Beachline = BST<number, Site>;

export type Point = { 
  x: number
  y: number
}

export type Site = {
  index: number
  point: Point
  cell: Cell
}

export type Cell = {
  site: Site
  edge: Edge
}

export type Edge = {
  origin: Point
  destination: Point
  twin: Edge
  incidentCell: Cell
  prev: Edge,
  next: Edge,
}
