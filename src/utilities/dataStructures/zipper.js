import BST from './bst'
import Stack from './stack'
import * as R from 'ramda'
import wu from 'wu'

class Breadcrumb {
  constructor(parent, childDirection) {
    return Object.freeze({
      parent,
      childDirection
    });
  }
}

class Zipper {
  constructor({ focus, breadcrumbs }) {
    return Object.freeze({ focus, breadcrumbs })
  }

  static empty = new Zipper({ focus: BST.empty, breadcrumbs: Stack.empty });

  left() {
    return new Zipper({
      focus: this.focus.left,
      breadcrumbs: Stack.push(new Breadcrumb(this.focus, 'left'), breadcrumbs)
    });
  }

  right() {
    return new Zipper({
      focus: this.focus.right,
      breadcrumbs: Stack.push(new Breadcrumb(this.focus, 'right'), breadcrumbs)
    });
  }

  up() {
    const {
      head: { focus: parent, childDirection },
      tail,
    } = this.breadcrumbs;
    return new Zipper({
      focus: R.set(R.lensProp(childDirection), this.focus, parent),
      breadcrumbs: tail,
    });
  }

  prev() {
  }

  next() {
    if (!BST.isEmpty(this.focus.right)) {
      return this.right();
    } else {
      const { head, tail } = this.breadcrumbs;
      if (head.childDirection === 'left') {
        return this.up();
      } else {
        throw new Error("not implemented")
        // return this.up()
      }
    }
  }

  insert(payload) {
    return this.reset().insertDownward(payload);
  }

  // private
  insertDownward(payload) {
    if (BST.isEmpty(this.focus)) {
      return R.set(R.lensProp('focus'), BST.singleNode(payload), this);
    } else if (payload.y < this.focus.payload.y) {
      return this.left().insertDownward(payload);
    } else {
      return this.right().insertDownward(payload);
    }
  }

  delete(y) {
    return this.reset().deleteDownward(y);
  }

  deleteDownward(y) {
    if (BST.isEmpty(this.focus)) {
      return this;
    } else if (y < this.focus.payload.y) {
      return this.left().deleteDownward(y);
    } else if (y > this.focus.payload.y) {
      return this.right().deleteDownward(y);
    } else {
      throw new Error("Not Implemented");
    }
  }

  save() {
    return wu(this.breadcrumbs).reduce(({ childDirection }, acc) => acc.push(childDirection))
  }

  restore(tape) {
    const { head, tail } = tape;
    if (head === undefined) return this;
    if (head === 'left') return this.left().restore(tail);
    if (head === 'right') return this.right().restore(tail);
    else throw new Error();
  }

  reset() {
    if (Stack.isEmpty(this.breadcrumbs)) {
      return this;
    } else {
      return this.up().reset();
    }
  }
}

export default Zipper;
