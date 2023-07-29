import { parabola, parabolaBezier, intersect } from './parabola'

describe('parabola', () => {
  test('vertex should have same height as focus', () => {
    const [f, _] = parabola({ focus: { x: 4, y: 10 }, directrix: 0 })
    expect(f(10)).toEqual(2)
  })

  test('should have symmetry about the focus', () => {
    const [f, _] = parabola({ focus: { x: 4, y: 10 }, directrix: 0 })

    for (let i = 1; i <= 10; i++) {
      expect(f(10 + i)).toEqual(f(10 - i))
    }
  })

  test('point', () => {
    const [f, _] = parabola({
      focus: {
        x: 102.265625,
        y: 246,
      },
      directrix: 0,
    })
    expect(f(246)).toEqual(51.1328125)
  })
})

describe('parabolaBezier', () => {
  test('Large y', () => {
    const focus = {
      x: 55,
      y: 328,
    }

    const { start, end, control } = parabolaBezier({
      focus,
      directrix: 0,
      y_range: [0, 366],
    })

    expect(start.x).toBeCloseTo(1005.54)
    expect(start.y).toBeCloseTo(0)
    expect(end.x).toBeCloseTo(40.63)
    expect(end.y).toBeCloseTo(366)
    expect(control.x).toBeLessThan(focus.x)
  })
})

describe('intersect', () => {
  test('focuses have the same y coordinate', () => {
    const points = intersect({
      focus1: { x: 0, y: 4 },
      focus2: { x: 2, y: 4 },
      directrix: 5,
    })
    expect(points).toHaveLength(2)
    expect(points[0]).toBeWithin(1e-2, {
      x: 1,
      y: 0.12701665379258267,
    })
    expect(points[1]).toBeWithin(1e-2, {
      x: 1,
      y: 7.87,
    })
  })

  test('focuses have the same x coordinate', () => {
    const points = intersect({
      focus1: { x: 2, y: 2 },
      focus2: { x: 2, y: 4 },
      directrix: 5,
    })
    expect(points).toHaveLength(1)
    expect(points[0]).toBeWithin(1e-2, { x: 3.3333333333333335, y: 3 })
  })

  test('general case', () => {
    const points = intersect({
      focus1: { x: 2, y: 0 },
      focus2: { x: 4, y: 4 },
      directrix: 5,
    })
    expect(points).toHaveLength(2)
    expect(points[0]).toBeWithin(1e-2, {
      x: 2.745966692414834,
      y: 2.127016653792583,
    })
    expect(points[1]).toBeWithin(1e-2, {
      x: -12.75,
      y: 9.87,
    })
  })
})
