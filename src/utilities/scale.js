export default ({
  node: { x, y },
  size: { width, height }
}) => ({
  x: width * x,
  y: height * y
})
