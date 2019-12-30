
const empty = new Empty();
const isEmpty = (tree) => tree instanceof Empty;

class Empty {
  constructor() {
    return Object.freeze({});
  }
}

const create = (payload, left, right) =>
  Object.freeze({
    payload,
    left,
    right,
  })

const singleNode = (payload) => create(payload, empty, empty);

export default {
  isEmpty,
  empty,
  create,
  singleNode,
}
