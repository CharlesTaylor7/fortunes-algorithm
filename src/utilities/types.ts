import type PriorityQueue from 'flatqueue'

export type Point = {
  x: number
  y: number
}

// All parabolas in this project
// have a vertical directrix which is the current position of
// the sweep line
export type Parabola = {
  focus: Point
  // x coordinate
  directrix: number
}

// A quadratic Bezier curve is a way of encoding a parabolic arc.
// The control point can be constructed by taking each tangent line
// of the start and end points and intersecting them.
// This uniquely describes the arc, and is the preferred encoding for SVG paths.
// See the mdn docs for a really illustrative animation:
// https://developer.mozilla.org/en-US/docs/Glossary/Bezier_curve
export type Bezier = {
  start: Point
  end: Point
  control: Point
}

export type Event = SiteEvent | CircleEvent

export type SiteEvent = {
  type: 'site'
  site: Site
}

export type CircleEvent = {
  type: 'circle'
  arcs: [IBeachNode, IBeachNode, IBeachNode]
  deleted: boolean
}

export type BoundingBox = { height: number; width: number }

export interface IDiagram {
  sites: Array<Site>
  sweeplineX: number
  beachline?: IBeachNode
  queue: PriorityQueue<Event>
  bounds: BoundingBox

  restart(): void
  newSite(point: Point, label?: string): Site
  step(): void
  prevBreakpoint(node: IBeachNode): number | undefined
  nextBreakpoint(node: IBeachNode): number | undefined

  toGraphviz(fileName?: string): Promise<void>
}

export interface IBeachNode {
  label: string
  site: Site
  siteIndex: number // TODO: remove this

  next?: IBeachNode
  prev?: IBeachNode
}

export type Site = {
  label: string
  index: number
  point: Point
  edge?: HalfEdge
}

// DCEL
// https://en.wikipedia.org/wiki/Doubly_connected_edge_list
export type HalfEdge = {
  origin: Point
  twin: HalfEdge
  site: Site
  prev: HalfEdge
  next: HalfEdge
}
