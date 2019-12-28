// focus: f_x, f_y
// directrix: x = d
// Math.abs(x - d) = Math.sqrt((x - f_x)**2 + (y-f_y)**2)
// (x - d)**2 = (x - f_x)**2 + (y-f_y)**2

// x**2 - 2*d*x + d**2 = x**2 - 2*f_x*x + f_x**2 + (y-f_y)**2

// 2*(f_x-d)*x = (y-f_y)**2 - d**2 + f_x**2
// x = ((y - f_y)**2 + f_x**2 - d**2) / (2 * (f_x - d))
export const parabola = ({ focus, directrix }) => {
  const { x: f_x, y: f_y } = focus;
  const d = directrix;

  const offset = f_x**2 - d**2;
  const denominator = 2 * (f_x - d);

  const x = y => ((y - f_y)**2 + offset) / (denominator);
  return x;
}

export const parabolaBezier = ({ focus, directrix, y_range }) => {
  const f = parabola({ focus, directrix });

  const [y_i, y_f] = y_range;

  if (focus.y - y_i < y_f - focus.y) {
    const dy = y_f - focus.y;
    const y_i = focus.y - dy;
    const start = { x: f(y_i), y: y_i }
    const end = { x: f(y_f), y: y_f }
    const vx = (focus.x + directrix) / 2;
    const c_x = 2 * vx - start.x;
    const c_y = focus.y;
    const control = { x: c_x, y: c_y };
    return { start, end, control };
  } else {
    const dy = focus.y - y_i;
    const y_f = focus.y + dy;
    const start = { x: f(y_i), y: y_i }
    const end = { x: f(y_f), y: y_f }
    const vx = (focus.x + directrix) / 2;
    const c_x = 2 * vx - start.x;
    const c_y = focus.y;
    const control = { x: c_x, y: c_y };
    return { start, end, control };
  }
}
