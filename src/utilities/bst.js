const empty = new Empty();
const isEmpty = (tree) => tree instanceof Empty;
const isTree = (tree) => tree instanceof Tree || tree instanceof Empty;

class Breadcrumb {
  constructor(parent, isLeftChild) {
    if (!(isLeftChild instanceof Boolean)) {
      throw new Error('isLeftChild should be bool.');
    }
    if (!(parent instanceof Tree)) {
      throw new Error('parrent should be tree.');
    }
    return ({ parent, isLeftChild });
  }
}

class Empty {
  constructor() {
    return Object.freeze({});
  }
}

class Tree {
  constructor(payload, left, right) {
    if (!isTree(left)) {
      throw new Error(`Left prop is not a tree.`);
    }
    if (!isTree(right)) {
      throw new Error(`Right prop is not a tree.`);
    }
    return Object.freeze({
      payload,
      left,
      right,
    })
  }
}

const insert = (tree, payload) => {
  if (isEmpty(tree)) {
    return new Tree(payload, empty, empty);
  } else if (payload.y < tree.payload.y) {
    return new Tree(tree.payload, insert(tree.left, payload), tree.right);
  } else {
    return new Tree(tree.payload, tree.left, insert(tree.right, payload));
  }
}

export default {
  isEmpty,
  empty,
  insert,
  remove,
  prev,
  next,
}
