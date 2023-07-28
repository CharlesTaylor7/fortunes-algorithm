// @ts-nocheck
import type { IBeachNode, IDiagram } from './types'
import { Diagram } from './fortune'

describe.skip('Diagram', () => {
  test('inserting beach nodes', async () => {
    const diagram = Diagram()
    diagram.newSite({ x: 1, y: 3 }, 'A')
    diagram.newSite({ x: 2, y: 4 }, 'B')
    diagram.newSite({ x: 3, y: 2 }, 'C')

    diagram.step()
    //await diagram.toGraphviz('step1')
    expect(beachLabels(diagram)).toEqual(['A1'])

    diagram.step()
    //await diagram.toGraphviz('step2')
    expect(beachLabels(diagram)).toEqual(['A1', 'B1', 'A2'])

    diagram.step()
    //await diagram.toGraphviz('step3')
    expect(beachLabels(diagram)).toEqual(['A1', 'C1', 'A3', 'B1', 'A2'])

    let nodes = Array.from(diagram.iterateBeachNodes())
    let nodesBackwards = Array.from(backwards(nodes[nodes.length - 1]), (node) => node.siteIndex)
    let nodeIndices = nodes.map((n) => n.siteIndex)

    expect(nodesBackwards.reverse()).toEqual(nodeIndices)
  })
})

function beachLabels(diagram: IDiagram): Array<string> {
  return Array.from(diagram.iterateBeachNodes(), (node) => node.label)
}

function* backwards(node: IBeachNode) {
  let current = node
  while (current) {
    yield current
    current = current.prev
  }
}
