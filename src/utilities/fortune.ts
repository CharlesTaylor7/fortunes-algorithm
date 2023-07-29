import PriorityQueue from 'flatqueue'
import { intersect as intersectParabolas } from '@/utilities/parabola'
import circumCircle from '@/utilities/circumCircle'
import type { IDiagram, IBeachNode, Site, HalfEdge, BoundingBox, Point, Event, CircleEvent } from '@/utilities/types'
import assert from '@/utilities/assert'

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
  circleEvents: Map<string, CircleEvent> = new Map()

  // For labeling beach nodes, we need to count the number of beach segments for each site
  beachNodeCounts: Array<number> = []
  stepCount: number = 0

  restart() {
    const locations = this.sites.map((s) => s.point)

    this.sites = []
    this.sweeplineX = 0
    this.beachline = undefined
    this.queue = new PriorityQueue()
    this.circleEvents = new Map()
    this.beachNodeCounts = []
    this.stepCount = 0

    for (let location of locations) {
      this.newSite(location)
    }
  }

  newSite(point: Point, labelArg?: string): Site {
    const index = this.sites.length
    const label = labelArg || String.fromCharCode(index + 65)
    const site: Site = { label, point, index }
    this.sites.push(site)
    this.queue.push({ type: 'site', site }, point.x)
    return site
  }

  step() {
    const event = this.queue.pop()
    if (event === undefined) return
    if (this.beachNodeCounts.length === 0) {
      this.beachNodeCounts = Array.from(this.sites, () => 0)
    }
    if (event.type === 'site') {
      this.insertBeachNode(event.site)
    } else if (event.type === 'circle' && !event.deleted) {
      this.processCircleEvent(event)
    }
    this.stepCount++
    this.checkInvariants()
  }

  insertBeachNode(site: Site) {
    const node = this.newBeachNode(site)
    this.sweeplineX = site.point.x
    if (this.beachline === undefined) {
      this.beachline = node
      this.beachNodeCounts[site.index]++
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

    this.deleteCircleEvent(current)

    // link node into beachline
    // link node after current
    const oldNext = current.next
    current.next = node
    node.prev = current

    // link copy of current after the new node
    const copy = this.copyBeachNode(current)
    node.next = copy
    copy.prev = node
    if (oldNext) {
      copy.next = oldNext
      oldNext.prev = copy
    }

    this.newCircleEvent(current)
    this.newCircleEvent(copy)
  }

  newCircleEvent(node: IBeachNode) {
    if (!node.prev || !node.next || node.prev === node.next) return
    // if the current node was the middle element of circle event triple,
    // then we delete that event.
    const event = this.circleEvents.get(`${node.prev.label}-${node.label}-${node.next.label}`)
    if (event) {
      event.deleted = true
    }

    const { center, radius } = circumCircle(node.prev.site.point, node.site.point, node.next.site.point)
    const x = center.x + radius
    if (x > this.sweeplineX) {
      const event: CircleEvent = {
        type: 'circle',
        arcs: [node.prev, node, node.next],
        deleted: false,
      }
      this.queue.push(event, x)
      this.circleEvents.set(`${node.prev.label}-${node.label}-${node.next.label}`, event)
    }
  }

  deleteCircleEvent(node: IBeachNode) {
    if (!node.prev || !node.next || node.prev === node.next) return
    const event = this.circleEvents.get(`${node.prev.label}-${node.label}-${node.next.label}`)
    if (event) {
      event.deleted = true
    }
  }

  newBeachNode(site: Site): IBeachNode {
    const count = this.beachNodeCounts[site.index]++
    return new BeachNode(site, `${site.label}1`)
  }

  copyBeachNode(node: IBeachNode) {
    const count = this.beachNodeCounts[node.siteIndex]++
    return new BeachNode(node.site, `${node.label[0]}${count}`)
  }

  deleteBeachNode(node: IBeachNode) {
    if (this.beachline === node) {
      this.beachline = node.next
    }
    if (node.prev) {
      node.prev.next = node.next
    }
    if (node.next) {
      node.next.prev = node.prev
    }
  }

  nextBreakpoint(node: IBeachNode): number | undefined {
    if (node.next) {
      const points = intersectParabolas({
        focus1: this.sites[node.siteIndex].point,
        focus2: this.sites[node.next.siteIndex].point,
        directrix: this.sweeplineX,
      })

      // return largest point by y coordinate
      const y = points[points.length - 1].y
      return Math.min(y, this.bounds.height)
    }
  }

  prevBreakpoint(node: IBeachNode): number | undefined {
    if (node.prev) {
      const points = intersectParabolas({
        focus1: this.sites[node.prev.siteIndex].point,
        focus2: this.sites[node.siteIndex].point,
        directrix: this.sweeplineX,
      })

      // return smallest point by y coordinate
      const y = points[0].y
      return Math.max(y, 0)
    }
  }

  *iterateBeachNodes(): Generator<IBeachNode> {
    let current = this.beachline
    while (current) {
      yield current
      current = current.next
    }
  }

  processCircleEvent(event: CircleEvent) {
    this.deleteCircleEvent(event.arcs[0])
    this.deleteCircleEvent(event.arcs[2])
    this.deleteBeachNode(event.arcs[1])
    this.newCircleEvent(event.arcs[0])
    this.newCircleEvent(event.arcs[2])
  }

  checkInvariants() {
    if (process.env.PROD) return
  }

  toGraphvizContent(): string {
    const content: Array<string> = []
    content.push('digraph {')

    let nodes: Array<IBeachNode> = Array.from(this.iterateBeachNodes())
    let nodesBackwards = Array.from(backwards(nodes[nodes.length - 1]))
    let nodesMap: Map<string, IBeachNode> = new Map()

    for (let node of nodes) {
      nodesMap.set(node.label, node)
    }
    for (let node of nodesBackwards) {
      nodesMap.set(node.label, node)
    }

    for (let node of nodesMap.values()) {
      content.push(`${node.label}`)
      if (node.next) {
        content.push(`${node.label} -> ${node.next.label} [color=green;label=next]`)
      }

      if (node.prev) {
        content.push(`${node.label} -> ${node.prev.label} [color=blue;label=prev]`)
      }
    }

    const labels = Array.from(nodesMap.keys()).join('; ')
    content.push(`{ rank=same; ${labels}}`)
    content.push('}')
    return content.join('\n')
  }

  // dump graphiz of the beachline to debug the issues
  async toGraphviz(name?: string) {
    if (process.env.PROD) return

    const fileName = name || `step${this.stepCount}`

    // https://github.com/jsdom/jsdom/issues/1537#issuecomment-229405327
    // detect jsdom for test cases
    if (typeof navigator.userAgent.includes('Node.js') || navigator.userAgent.includes('jsdom')) {
      const fs = await import('node:fs/promises')
      const file = await fs.open(`graphs/${fileName}.txt`, 'w')
      await file.write(this.toGraphvizContent())
      const child_process = await import('node:child_process')
      child_process.execSync(`dot -Tsvg graphs/${fileName}.txt > graphs/${fileName}.svg`)
    }
    // otherwise running in browser, hit the dev express server
    else {
      const response = await fetch('./graphviz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName,
          content: this.toGraphvizContent(),
        }),
      })
    }
  }
}

function beachLabels(diagram: Diagram): Array<string> {
  return Array.from(diagram.iterateBeachNodes(), (node) => diagram.sites[node.siteIndex].label)
}

function* backwards(node: IBeachNode) {
  let current: IBeachNode | undefined = node
  while (current) {
    yield current
    current = current.prev
  }
}

// TODO: balance these
class BeachNode implements IBeachNode {
  label: string
  site: Site
  siteIndex: number // TODO: delete this
  next?: IBeachNode
  prev?: IBeachNode

  constructor(site: Site, label: string) {
    this.site = site
    this.siteIndex = site.index
    this.label = label
  }
}
