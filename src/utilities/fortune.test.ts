// @ts-nocheck
import type { IBeachNode, IDiagram } from './types'
import { Diagram } from './fortune'


describe('Diagram', () => {
  test('inserting beach nodes', () => {
    const diagram = Diagram()
    diagram.newSite({ x: 1, y: 3 }, 'A')
    diagram.newSite({ x: 2, y: 4 }, 'B')
    diagram.newSite({ x: 3, y: 2 }, 'C')

    diagram.step()
    expect(beachLabels(diagram)).toEqual( ['A'])
    diagram.step()
    expect(beachLabels(diagram)).toEqual( ['A', 'B', 'A'])
    diagram.step()
    expect(beachLabels(diagram)).toEqual( ['A', 'C', 'A', 'B', 'A'])

    let nodes = Array.from(diagram.iterateBeachNodes())
    let nodesBackwards = Array.from(backwards(nodes[nodes.length-1]), node => node.siteIndex)
    let nodeIndices = nodes.map(n => n.siteIndex)

    expect(nodeIndices).toEqual(nodesBackwards.reverse())
  })
})

function beachLabels(diagram: IDiagram): Array<string> {
  return Array.from(diagram.iterateBeachNodes(), (node) => diagram.sites[node.siteIndex].label)
}

function* backwards(node: IBeachNode) {
  let current = node
  while (current) {
    yield current
    current = current.prev
  }
}
