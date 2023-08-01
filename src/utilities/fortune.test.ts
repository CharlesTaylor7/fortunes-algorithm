// @ts-nocheck
import type { IBeachNode, IDiagram } from './types'
import { Diagram } from './fortune'

describe('Diagram', () => {
  test('#step', async () => {
    const diagram = Diagram()
    diagram.bounds = { width: 300, height: 300 }

    diagram.newSite({ x: 1, y: 3 }, 'A')
    diagram.newSite({ x: 2, y: 4 }, 'B')
    diagram.newSite({ x: 3, y: 2 }, 'C')

    diagram.step()
    expect(beachLabels(diagram)).toEqual(['A1'])

    diagram.step()
    expect(beachLabels(diagram)).toEqual(['A1', 'B1', 'A2'])

    diagram.step()
    expect(beachLabels(diagram)).toEqual(['A1', 'C1', 'A3', 'B1', 'A2'])

    diagram.step()
    expect(beachLabels(diagram)).toEqual(['A1', 'C1', 'B1', 'A2'])

    diagram.step()
    expect(beachLabels(diagram)).toEqual(['A1', 'B1', 'A2'])

    diagram.step()
    expect(beachLabels(diagram)).toEqual(['A1', 'B1', 'A2'])

    expect(() => diagram.step()).toThrow('event queue empty')
  })

  test('inserting to the beachline', async () => {
    const diagram = Diagram()
    diagram.bounds = { width: 300, height: 300 }

    diagram.newSite({ x: 1, y: 3 }, 'A')
    diagram.newSite({ x: 2, y: 4 }, 'B')
    diagram.newSite({ x: 3, y: 2 }, 'C')

    diagram.step()
    diagram.step()
    diagram.step()

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
