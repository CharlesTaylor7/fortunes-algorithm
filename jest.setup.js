
function normSquared(point1, point2) {
  return (point1.x - point2.x)**2 + (point1.y - point2.y)**2 
}

function format(point) {
  return `(${point.x}, ${point.y})`
}
      

function toBeWithin(actual, distance, expected) {
  return ({
    pass: normSquared(actual, expected) < distance**2,
    message() {
      return `expected ${format(actual)} to be within ${distance} of ${format(expected)}`
    },
  })
}


expect.extend({ toBeWithin })
