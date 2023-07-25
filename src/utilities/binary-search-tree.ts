class TreeNode<K, V> {
  key: K
  value: V
  isRed: boolean
  left?: TreeNode<K, V>
  right?: TreeNode<K, V>

  constructor(key: K, value: V, isRed: boolean) {
    this.key = key
    this.value = value
    this.isRed = isRed
  }

  insert(node: TreeNode<K, V>) {
    if (node.key < this.key) {
      if (this.left === undefined) {
        this.left = node
      }

      this.left.insert(node)
    }

    else {
      if (this.right === undefined) {
        this.right = node
      }

      this.right.insert(node)
    }
  }
}

class BST<K, V> {
  root?: TreeNode<K, V>

  insert(key: K, value: V) {
    const node = new TreeNode<K, V>(key, value, false)
    
    if (this.root === undefined) {
      this.root = node
    }

    else {
      this.root.insert(node)
    }
  }
}

