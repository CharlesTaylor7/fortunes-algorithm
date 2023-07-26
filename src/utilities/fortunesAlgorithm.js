import FlatQueue from 'flatqueue'
import Zipper from './dataStructures/zipper'
import Diagram from './dataStructures/voronoiDiagram'
import circumCircle from './circumCircle'

export function* step(points) {
  const deletedEvents = new FlatQueue()
  const eventQueue = new FlatQueue()
  for (let site of points) {
    const siteEvent = { type: 'site', site }
    eventQueue.push(siteEvent)
  }

  let directrix = 0
  const diagram = new Diagram()

  const beachline = Zipper.empty
  const currentState = () => ({ directrix, beachline, diagram, eventQueue })

  while (true) {
    if (eventQueue.length === 0) return
    while (eventQueue.peekValue() === deletedEvents.peekValue()) {
      eventQueue.pop()
      deletedEvents.pop()
    }

    yield currentState()

    if (eventQueue.length === 0) return
    const event = eventQueue.pop()

    if (event.type === 'site') {
      beachline = beachline.seekArc(event.site)
      const pi = event.site
      const pj = beachline.focus
      const p3 = beachline.next().focus
      const p2 = beachline.prev().focus
      const getX = ({ center: { x }, radius }) => x - radius
      deletedEvents.push('', getX(circumCircle(p2, p3, pj)))

      const circle1 = circumCircle(p2, pj, pi)
      const circleEvent1 = {
        type: 'circle',
        sites: [p2, pj, pi],
        circle: circle1,
        x: getX(circle1),
      }

      const circle2 = circumCircle(pi, pj, p3)
      const circleEvent2 = {
        type: 'circle',
        sites: [pi, pj, p3],
        circle: circle2,
        x: getX(circle2),
      }
    } else if (event.type === 'circle') {
    } else {
      console.alert(JSON.stringify(event))
      throw new Error('Invalid event')
    }
  }
  yield currentState()
}
