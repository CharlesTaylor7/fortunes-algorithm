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

  // For labeling beach nodes, we need to count the number of beach segments for each site
  beachNodeCounts: Array<number> = []

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
    }
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
  }

  newBeachNode(site: Site): IBeachNode {
    const count = this.beachNodeCounts[site.index]++
    return new BeachNode(site.index, `${site.label}1`)
  }

  copyBeachNode(node: IBeachNode) {
    const count = this.beachNodeCounts[node.siteIndex]++
    return new BeachNode(node.siteIndex, `${node.label[0]}${count}`)
  }

  nextBreakpoint(node: IBeachNode): number | undefined {
    if (node.next) {
      return intersectParabolas({
        focus1: this.sites[node.siteIndex].point,
        focus2: this.sites[node.next.siteIndex].point,
        directrix: this.sweeplineX,
        domain: [0, this.bounds.height],
      })[0].y
    }
  }

  prevBreakpoint(node: IBeachNode): number | undefined {
    if (node.prev) {
      return intersectParabolas({
        focus1: this.sites[node.prev.siteIndex].point,
        focus2: this.sites[node.siteIndex].point,
        directrix: this.sweeplineX,
        domain: [0, this.bounds.height],
      })[0].y
    }
  }

  // nodejs only
  // dump graphiz of the beachline to debug the issues
  async toGraphviz(filename: string) {
    const fs = await import('node:fs/promises')
    const file = await fs.open(`graphs/${filename}.txt`, 'w')
    await file.write('digraph {\n')

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
      await file.write(`${node.label}\n`)
      if (node.next) {
        await file.write(`${node.label} -> ${node.next.label} [color=green;label=next]\n`)
      }

      if (node.prev) {
        await file.write(`${node.label} -> ${node.prev.label} [color=blue;label=prev]\n`)
      }
    }

    const labels = Array.from(nodesMap.keys()).join('; ')
    await file.write(`{ rank=same; ${labels}}\n`)
    await file.write('}\n')
    await file.close()

    const child_process = await import('child_process')
    child_process.execSync(`dot -Tsvg graphs/${filename}.txt > graphs/${filename}.svg`)
  }

  *iterateBeachNodes(): Generator<IBeachNode> {
    let current = this.beachline
    while (current) {
      yield current
      current = current.next
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
  siteIndex: number
  next?: IBeachNode
  prev?: IBeachNode

  constructor(siteIndex: number, label: string) {
    this.siteIndex = siteIndex
    this.label = label
  }
}
