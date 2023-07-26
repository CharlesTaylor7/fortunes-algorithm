import { bisector } from './circumCircle'

const parabola = ({ focus, directrix }) => {
  const { x: f_x, y: f_y } = focus
  const d = directrix

  const offset = f_x ** 2 - d ** 2
  const denominator = 2 * (f_x - d)

  return [(offset + f_y ** 2) / denominator, (-2 * f_y) / denominator, 1 / denominator]
}

const solveQuadratic = (a, b, c) => {
  const discriminant = b ** 2 - 4 * a * c
  if (discriminant < 0) throw new Error()
  const d_sqrt = Math.sqrt(discriminant)
  return [(-b + d_sqrt) / (2 * a), (-b - d_sqrt) / (2 * a)]
}

export default (focus1, focus2, directrix) => {
  const [c, b, a] = parabola({ focus: focus2, directrix })
  const { b: p, m } = bisector(focus1, focus2)

  const s = m.x / m.y

  // a * y**2 + b * y + c = s * (y - p.y) + p.x
  const [y_1, y_2] = solveQuadratic(a, b - s, c + s * p.y - p.x)
  const x_1 = s * (y_1 - p.y) + p.x
  const x_2 = s * (y_2 - p.y) + p.x

  return x_1 > x_2 ? y_1 : y_2
}
