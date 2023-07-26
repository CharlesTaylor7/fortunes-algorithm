import { parabola, parabolaBezier } from './parabola'

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

test('', () => {
  const [f, _] = parabola({
    focus: {
      x: 102.265625,
      y: 246,
    },
    directrix: 0,
  })
  expect(f(246)).toEqual(51.1328125)
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

    console.log('Start', start, 'end', end, 'control', control)
    expect(start.x).toBeCloseTo(1005.54)
    expect(start.y).toBeCloseTo(0)
    expect(end.x).toBeCloseTo(40.63)
    expect(end.y).toBeCloseTo(366)
    expect(control.x).toBeLessThan(focus.x)
  })
})
