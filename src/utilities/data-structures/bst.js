
const empty = new Empty();
const isEmpty = (tree) => tree instanceof Empty;

class Empty {
  constructor() {
    return Object.freeze({});
  }
}

const tree = (payload, left, right) =>
  Object.freeze({
    payload,
    left,
    right,
  })

export default {
  isEmpty,
  empty,
  tree,
}
