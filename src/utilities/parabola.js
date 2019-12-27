// focus: f_x, f_y
// directrix: x = d
// Math.abs(x - d) = Math.sqrt((x - f_x)**2 + (y-f_y)**2)
// (x - d)**2 = (x - f_x)**2 + (y-f_y)**2
// x**2 - 2*d*x + d**2 =
// x**2 - 2*f_x*x + f_x**2 + (y-f_y)**2
// 2*(f_x-d)*x + d**2 - f_x**2 = (y-f_y)**2
// x = ((y - f_y)**2 + f_x**2 - d**2) / (2 * (f_x - d))
// x' = 2 * (y - f_y) / (2 * (f_x - d))
// x' = (y - f_y) / (f_x - d)
const getX = ({ focus, directrix }) => {
  const { x: f_x, y: f_y } = focus;
  const d = directrix;

  const offset = f_x**2 - d**2;
  const denominator = 2 * (f_x - d);

  return y => ((y - f_y)**2 + offset) / (2 * denominator);
}

export const parabolaBezier = ({ focus, directrix, y_range }) => {
  const f = getX({ focus, directrix });
  const d = directrix;
  const [y_i, y_f] = y_range;
  const x_i = f(y_i);
  const x_f = f(y_f);
  const { x: f_x, y: f_y } = focus;
  const dy = f_y - y_i;
  const x_slope = dy / (d - f_x);
  const dx = x_slope * dy;
  const c_x = x_i + dx;
  const c_y = f_y;

  const start = { x: x_i, y: y_i }
  const end = { x: x_f, y: y_f }
  const control = { x: c_x, y: c_y }

  return { start, end, control }
}
