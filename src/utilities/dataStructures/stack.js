import wu from 'wu'

function push(head) {
  return new Stack(head, this);
}

function pop(num) {
  const result = [];
  const stack = this;
  for (let i = 0; i < num; i++) {
    if (isEmpty(stack)) {
      throw new Error();
    } else {
      result.push(stack.head);
      stack = stack.tail;
    }
  }
  result.push(stack);
  return result;
};

function isStack(obj) {
  const { constructor: name } = obj;
  return name === Empty.name || name === Stack.name;
}

class Empty {
  constructor() {
    this[Symbol.iterator] = function* () {}
    this.push = push.bind(this);
    this.pop = pop.bind(this);
    return Object.freeze(this);
  }
}

class Stack {
  constructor(head, tail) {
    if (!isStack(tail)) {
      throw new Error('Tail must be a stack.')
    }
    this.head = head;
    this.tail = tail;
    this[Symbol.iterator] = function* () {
      yield this.head;
      yield* this.tail;
    }
    this.push = push.bind(this);
    this.pop = pop.bind(this);
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

const reverse = stack => fromArray(Array.from(stack).reverse());

export {
  empty,
  isEmpty,
  fromArray,
  reverse,
}
