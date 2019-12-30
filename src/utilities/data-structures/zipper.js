import BST from './bst'
import Stack from './stack'
import * as R from 'ramda'

class Breadcrumb {
  constructor(parent, childDirection) {
    return Object.freeze({
      parent,
      childDirection
    });
  }
}

class Zipper {
  constructor({ node, breadcrumbs }) {
    return Object.freeze({ node, breadcrumbs })
  }

  left() {
    return new Zipper({
      node: this.node.left,
      breadcrumbs: breadcrumbs.push(new Breadcrumb(this.node, 'left'))
    });
  }

  right() {
    return new Zipper({
      node: this.node.right,
      breadcrumbs: breadcrumbs.push(new Breadcrumb(this.node, 'right'))
    });
  }

  up() {
    const [{ node: parent, childDirection }, breadcrumbs ] = this.breadcrumbs.pop(1);
    return new Zipper({
      node: R.lensProp(childDirection).set(this.node, parent),
      breadcrumbs,
    });
  }

  insert(payload) {

  }

  delete(y) {

  }

  focusNext() {

  }

  focusPrev() {

  }
}


export default Zipper;
