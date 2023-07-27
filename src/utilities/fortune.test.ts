import { diagram } from './fortune'

describe('Diagram', () => {
  test('inserting beach node', () => {
    const d = diagram()
    d.newSite({ x: 1, y: 3 })
    d.newSite({ x: 2, y: 4 })
    d.newSite({ x: 3, y: 5 })

    d.step()
    d.step()
    d.step()

    expect(d.beachline).not.toBeNull()
  })
})
