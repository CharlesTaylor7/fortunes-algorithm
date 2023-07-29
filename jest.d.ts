
type Point = { x: number; y: number }
/*
interface CustomMatchers<R = unknown> {
  toBeWithin(distance: number, point: Point): R;
}
*/

namespace jest {
  //interface Expect extends CustomMatchers { }
  //interface Matchers<R> extends CustomMatchers<R> { }
  interface Matchers<R> {
    toBeWithin(distance: number, expected: Point): CustomMatcherResult
    //toBeSameMoment(expected: moment.Moment): CustomMatcherResult;
  }
}

    //interface matchers<R> { toBeOdd(a: number): R; }
/*
    interface ExpectExtendMap {
      toBeWithin: (
        this: jest.MatcherContext,
        actual: Point,
        distance: number,
        expected: Point,
      ) => jest.CustomMatcherResult
    }
    */
