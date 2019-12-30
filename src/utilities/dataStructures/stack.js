import wu from 'wu'

const push = (head, tail) => new Stack(head, tail);

const isStack = (obj) =>
  obj instanceof Empty ||
  obj instanceof Stack;

class Empty {
  constructor() {
    this[Symbol.iterator] = function* () {};
    return Object.freeze(this);
  }
}

class Stack {
  constructor(head, tail) {
    debugger;
    if (!isStack(tail)) {
      throw new Error('Tail must be a stack.')
    }
    this.head = head;
    this.tail = tail;
    this[Symbol.iterator] = function* () {
      yield this.head;
      yield* this.tail;
    }
    return Object.freeze(this);
  }
}

const empty = new Empty();

const isEmpty = stack => stack.constructor.name === Empty.name;

function* reverse(array) {
  for(let i = array.length - 1; i > -1; i--) {
    yield array[i];
  }
}

const fromArray = array =>
  wu(reverse(array))
    .reduce((stack, elem) => stack.push(elem), empty);

export default {
  push,
  empty,
  isEmpty,
  fromArray,
}
