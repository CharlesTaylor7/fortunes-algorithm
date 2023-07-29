type Point = { x: number; y: number }

// TODO: this doesn't constrain the matcher to only work after expect(point)
// you can run this matcher on any value at all, but I want to constrain
namespace jest {
  interface Matchers<R> {
    toBeWithin(distance: number, expected: Point): CustomMatcherResult
  }
}
