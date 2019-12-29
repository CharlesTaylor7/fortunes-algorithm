const bisector = (
  { x1, y1 },
  { x2, y2 }
) => ({
  b: { x: (x1 + x2) / 2, y: (y1 + y2) / 2 },
  m: { x: (y1 - y2), y: (x2 - x1) },
})

const distance = (
  { x1, y1 },
  { x2, y2 }
) => Math.sqrt((x1 - x2)**2 + (y1 - y2)**2);

export default (point1, point2, point3) => {

  const { b: p, m: u } = bisector(point1, point2);
  const { b: q, m: v } = bisector(point2, point3);
  const w = { x: p.x - q.x, y: p.y - q.y };

  const s = (v.y * w.x - v.x * w.y) / (v.x * u.y - v.y * u.x);
  const center = { x: p.x + u.x * s, y: p.y + u.y * s };
  const radius = distance(center, point1);

  return { center, radius };
}
