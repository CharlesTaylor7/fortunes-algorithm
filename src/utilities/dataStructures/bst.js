const empty = new Empty()
const isEmpty = (tree) => tree instanceof Empty

class Empty {
  constructor() {
    return Object.freeze({})
  }
}

const create = (payload, left, right) =>
  Object.freeze({
    payload,
    left,
    right,
  })

const singleNode = (payload) => create(payload, empty, empty)

function* inorderTraversal(tree) {
  if (isEmpty(tree)) return
  yield* traverse(tree.left)
  yield tree
  yield* traverse(tree.right)
}

export default {
  isEmpty,
  empty,
  create,
  singleNode,
  inorderTraversal,
}
