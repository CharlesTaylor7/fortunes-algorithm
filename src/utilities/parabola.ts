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
// 6. Take the derivative dx/dy
// x' = (y - f_y) / (f_x - d)
//
export const parabola = ({ focus, directrix }: Parabola): [Curve, Curve] => {
  const { x: f_x, y: f_y } = focus
  const d = directrix

  const offset = f_x ** 2 - d ** 2
  const denominator = 2 * (f_x - d)

  const x = (y: number) => ((y - f_y) ** 2 + offset) / denominator
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

const solveQuadratic = (a: number, b: number, c: number): [number, number] => {
  const discriminant = b ** 2 - 4 * a * c
  if (discriminant < 0) {
    /*
    console.error('negative discriminant', { a, b, c, discriminant })
    */
    return [0, 0]
  }
  const d_sqrt = Math.sqrt(discriminant)
  return [(-b + d_sqrt) / (2 * a), (-b - d_sqrt) / (2 * a)]
}

type IntersectArgs = {
  focus1: Point
  focus2: Point
  directrix: number
  domain: [number, number]
}

function average(focus1: Point, focus2: Point): Point {
  return { x: (focus1.x + focus2.x) / 2, y: (focus1.y + focus2.y) / 2 }
}

export function intersect({ focus1, focus2, directrix, domain }: IntersectArgs): Point[] {
  if (focus1.x > directrix || focus2.x > directrix) {
    throw new Error('expected directrix to exceed focii')
  }
  const [f_A, f_A_prime] = parabola({ focus: focus1, directrix })
  const [f_B, f_B_prime] = parabola({ focus: focus2, directrix })

  // perform newton's method to intersect
  const focus = focus1.x > focus2.x ? focus1 : focus2

  const [start, end] = domain
  return [runNewton([start, focus.y]), runNewton([focus.y, end])].filter((point) => point) as Point[]

  function runNewton(domain: [number, number]): Point | undefined {
    const [start, end] = domain
    // guess a random value that's within the domain
    let guess = start + Math.random() * (end - start)

    let prev = Number.NEGATIVE_INFINITY
    while (guess - prev > 0.000000001) {
      const newGuess = guess - (f_A(guess) - f_B(guess)) / (f_A_prime(guess) - f_B_prime(guess))
      if (Number.isNaN(newGuess)) {
        // got unlucky?
        return
        // return runNewton(domain)
      }

      prev = guess
      guess = newGuess
    }

    const y = guess
    if (y < start || y > end) return

    const x = (f_A(guess) + f_B(guess)) / 2
    if (x < 0 || x > directrix) return

    return { x, y }
  }
}
