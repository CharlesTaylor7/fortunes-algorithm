export type Point = { x: number; y: number }

function normSquared(point1: Point, point2: Point): number {
  return (point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2
}

function format(point: Point): string {
  return `(${point.x.toFixed(2)}, ${point.y.toFixed(2)})`
}

function toBeWithin(actual: Point, distance: number, expected: Point): CustomMatcherResult {
  const pass = normSquared(actual, expected) < distance ** 2
  return {
    pass,
    message() {
      if (pass) {
        return `expected the distance from ${format(actual)} to ${format(expected)} to be less than ${distance}`
      } else {
        return `expected the distance from ${format(actual)} to ${format(expected)} to be more than ${distance}`
      }
    },
  }
}

expect.extend({ toBeWithin })
