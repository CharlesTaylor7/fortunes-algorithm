const empty = () => new Tree(new Null(), null, null);
const isEmpty = (tree) => tree.payload instanceof Null;
const isTree = (tree) => tree instanceof Tree;

class Null {}

class Tree {
  constructor(payload, left, right) {
    if (!isTree(left)) {
      throw new Error(`Left prop is not a tree.`);
    }
    if (!isTree(right)) {
      throw new Error(`Right prop is not a tree.`);
    }
    this.payload = payload;
    this.left = left;
    this.right = right;
  }
}

const insert = (tree, payload, { parent, isLeftChild } = {}) => {
  if (isEmpty(tree)) {
    tree.payload = payload;
    tree.left = empty();
    tree.right = empty();
    if (parent !== undefined) {
      if (isLeftChild) {
        insertDLLBefore(parent, tree)
      } else {
        insertDLLAfter(parent, tree)
      }
    }
  } else if (payload.y < tree.payload.y) {
    insert(tree.left, payload, { parent: tree, isLeftChild: true });
  } else {
    insert(tree.right, payload, { parent: tree, isLeftChild: false });
  }
}

const insertDLLAfter = (node, after) => {
  const next = node.next;
  if (next !== undefined) {
    next.prev = after;
  }
  after.prev = node;
  after.next = next;
  node.next = after;
}

const insertDLLBefore = (node, before) => {
  const prev = node.prev;
  if (prev !== undefined) {
    prev.next = before;
  }
  before.prev = prev;
  before.next = node;
  node.prev = before;
}

const remove = (tree, y, { parent, isLeftChild } = {}) => {
  if (isEmpty(tree)) {
    return;
  } else if (y === tree.payload.y) {
    deleteDLLNode(tree);
    if (isEmpty(tree.left) && isEmpty(tree.right)) {
      return;
    }
    let replacement;
    if (isEmpty(tree.left)) {
      replacement = tree.right;
      insert
    }
    else if (isEmpty(tree.right)) {
      replacement = tree.left;
    }
    else {
      replacement =
       tree.left.payload.y < tree.right.payload.y
        ? tree.left
        : tree.right;
    }
    replacement.
  } else if (y < tree.payload.y) {
    remove(tree.left, y, { parent: tree, isLeftChild: true });
  } else {
    remove(tree.right, y, { parent: tree, isLeftChild: false });
  }
}

deleteDLLNode = (node) => {
  if (node.prev !== undefined) {
    node.prev.next = node.next;
  }
  if (node.next !== undefined) {
    node.next.prev = node.prev;
  }
}

const prev = (node) => node.prev;
const next = (node) => node.next;

export default {
  isEmpty,
  empty,
  insert,
  remove,
  prev,
  next,
}
