import { bisector } from '@/utilities/circumCircle'
import type { Point, Parabola, Bezier } from '@/utilities/types'

// focus: f_x, f_y
// directrix: x = d
// 1. Equation defining a parabola
// Math.abs(x - d) = Math.sqrt((x - f_x)**2 + (y-f_y)**2)
//
// 2. Square each side
// (x - d)**2 = (x - f_x)**2 + (y-f_y)**2

// 3. Expand
// x**2 - 2*d*x + d**2 = x**2 - 2*f_x*x + f_x**2 + (y-f_y)**2

// 4. Rearrange terms to isolate x
// 2*(f_x-d)*x = (y-f_y)**2 - d**2 + f_x**2
//
// 5. Divide to a formula for x
// x = ((y - f_y)**2 + f_x**2 - d**2) / (2 * (f_x - d))
//
// 5'. Distribute terms to simplify
// x = (y - f_y)**2/(2 * (f_x -d)) + (f_x + d) / 2
//
// 6. Take the derivative dx/dy
// x' = (y - f_y) / (f_x - d)
//
export const parabola = ({ focus, directrix }: Parabola): [Curve, Curve] => {
  const { x: f_x, y: f_y } = focus
  const d = directrix

  const x = (y: number) => (y - f_y) ** 2 / (2 * (f_x - d)) + (f_x + d) / 2
  const x_prime = (y: number) => (y - f_y) / (f_x - d)
  return [x, x_prime]
}

type BezierInput = Parabola & {
  y_range: [number, number]
}

type Curve = (y: number) => number
type BezierOutput = [Curve, Curve]
type ParabolaBezier = (input: BezierInput) => Bezier

export const parabolaBezier: ParabolaBezier = ({ focus, directrix, y_range }) => {
  const [x, x_prime] = parabola({ focus, directrix })

  const [y_i, y_f] = y_range

  const x_i = x(y_i)
  const x_f = x(y_f)
  const start = { x: x_i, y: y_i }
  const end = { x: x_f, y: y_f }

  // control point is determined by
  // intersecting the two tangent lines emanating between the two curves.
  const m1 = x_prime(y_i)
  const m2 = x_prime(y_f)

  const e = x_i - m1 * y_i
  const f = x_f - m2 * y_f

  const det = m1 - m2
  const c_x = (-m2 * e + m1 * f) / det
  const c_y = (-1 * e + f) / det

  if (!Number.isFinite(c_x) || !Number.isFinite(c_y)) {
    const start = { x: directrix, y: focus.y }
    const end = { x: 0, y: focus.y }
    return { start, end, control: start }
  }

  const control = { x: c_x, y: c_y }

  return { start, end, control }
}

const parabolaCoefficients = ({ focus, directrix }: Parabola) => {
  const { x: f_x, y: f_y } = focus
  const d = directrix

  const offset = f_x ** 2 - d ** 2
  const denominator = 2 * (f_x - d)

  return [(offset + f_y ** 2) / denominator, (-2 * f_y) / denominator, 1 / denominator]
}

function tap<T>(x: T): T {
  console.log(x)
  return x
}

const solveQuadratic = (a: number, b: number, c: number): number[] => {
  const discriminant = b ** 2 - 4 * a * c
  if (discriminant < 0) {
    console.error('negative discriminant', { a, b, c, discriminant })
  }
  const d_sqrt = Math.sqrt(discriminant)
  const roots = [(-b - d_sqrt) / (2 * a), (-b + d_sqrt) / (2 * a)].sort()
  if (Number.isFinite(roots[0]) && Number.isFinite(roots[1])) {
    return roots
  }
  return [c / -b]
}

type IntersectArgs = {
  focus1: Point
  focus2: Point
  directrix: number
}

const TOLERANCE = 1e-10

export function intersect({ focus1, focus2, directrix }: IntersectArgs): Point[] {
  if (Math.abs(focus1.x - directrix) < TOLERANCE) {
    const [f, _] = parabola({ focus: focus2, directrix })
    return [{ x: f(focus1.y), y: focus1.y }]
  }
  if (Math.abs(focus2.x - directrix) < TOLERANCE) {
    const [f, _] = parabola({ focus: focus1, directrix })
    return [{ x: f(focus2.y), y: focus2.y }]
  }

  const [c1, b1, a1] = parabolaCoefficients({ focus: focus1, directrix })
  const [c2, b2, a2] = parabolaCoefficients({ focus: focus2, directrix })
  const roots = solveQuadratic(a1 - a2, b1 - b2, c1 - c2)

  const [f1] = parabola({ focus: focus1, directrix })
  // const [f2] = parabola({ focus: focus2, directrix })

  return roots.map((y) => ({ x: f1(y), y }))
}

function average(focus1: Point, focus2: Point): Point {
  return { x: (focus1.x + focus2.x) / 2, y: (focus1.y + focus2.y) / 2 }
}
