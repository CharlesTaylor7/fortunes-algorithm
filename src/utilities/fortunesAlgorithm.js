import FlatQueue from 'flatqueue';
import BST from './dataStructures/bst';
import Zipper from './dataStructures/zipper';
import Diagram from './dataStructures/voronoiDiagram';

export function* step(points) {
  const eventQueue = new FlatQueue();
  for (let site of points) {
    eventQueue.push(site.x, { type: 'site', site });
  }

  let directrix = 0;
  const diagram = new Diagram();

  const beachline = Zipper.empty;
  const currentState = () => ({ directrix, beachline, diagram, eventQueue });

  while (eventQueue.length > 0) {
    yield currentState();
    const event = eventQueue.pop();
    if (event.type === 'site') {

    } else if (event.type === 'circle') {

    } else {
      throw new Error("Invalid event " + event);
    }
  }
  yield currentState();
}
