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
export const parabola = ({ focus, directrix }) => {
  const { x: f_x, y: f_y } = focus;
  const d = directrix;

  const offset = f_x**2 - d**2;
  const denominator = 2 * (f_x - d);

  const x = y => ((y - f_y)**2 + offset) / (denominator);
  const x_prime = y => (y - f_y) / (f_x - d);
  return [x, x_prime];
}

export const parabolaBezier = ({ focus, directrix, y_range }) => {
  const [x, x_prime] = parabola({ focus, directrix });

  const [ y_i, y_f ] = y_range;

  const x_i = x(y_i);
  const x_f = x(y_f);
  const start = { x: x_i, y: y_i }
  const end = { x: x_f, y: y_f }

  // control point is determined by
  // intersecting the two tangent lines emanating between the two curves.
  const m1 = x_prime(y_i);
  const m2 = x_prime(y_f);

  const e = x_i - m1 * y_i;
  const f = x_f - m2 * y_f;

  const det = m1 - m2;
  const c_x = (-m2 * e + m1 * f) / det;
  const c_y = (-1 * e + f) / det;

  if (!Number.isFinite(c_x) || !Number.isFinite(c_y)) {
    const start = { x: directrix, y: focus.y };
    const end = { x: 0, y: focus.y };
    return { start, end, control: start };
  }

  const control = { x: c_x, y: c_y };

  return { start, end, control };
}
