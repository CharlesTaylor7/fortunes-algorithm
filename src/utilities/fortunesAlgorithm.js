import FlatQueue from 'flatqueue';

const edge = (point1, point2) => ({ point1, point2 });

const bst = (left, right, node) => ({ left, right, node });

export const step = (points) => {
  const eventQueue = new FlatQueue();
  for (let site of points) {
    eventQueue.push(site.x, { type: 'site', site });
  }

  let directrix = 0;
  // Array of arrays of edges
  const polygons = [];

  const beachline = null;

  while (eventQueue.length > 0) {
    const event = eventQueue.pop();

  }

  return () => {
    return {
      directrix,
      polygons,
      eventQueue,
    }
  };
}
