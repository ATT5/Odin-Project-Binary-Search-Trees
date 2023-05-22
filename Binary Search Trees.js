"use strict";

class Node {
  constructor(d) {
    this.data = d;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor(arr) {
    this.root = this.builTree(arr);
  }

  builTree(arr) {
    if (!Array.isArray(arr)) return null;
    const newArr = [...new Set(arr.sort((a, b) => a - b))];
    const root = this.sortedArrayToBST(newArr, 0, newArr.length - 1);
    return root;
  }

  sortedArrayToBST(arr, start, end) {
    if (start > end) return null;

    const mid = parseInt((start + end) / 2);
    const node = new Node(arr[mid]);
    node.left = this.sortedArrayToBST(arr, start, mid - 1);
    node.right = this.sortedArrayToBST(arr, mid + 1, end);
    return node;
  }

  insert(num, node = this.root) {
    if (node.data > num) {
      if (node.left === null) {
        const newNode = new Node(num);
        node.left = newNode;
        return node;
      }
      return this.insert(num, node.left);
    }

    if (node.data < num) {
      if (node.right === null) {
        const newNode = new Node(num);
        node.right = newNode;
        return node;
      }
      return this.insert(num, node.right);
    }
  }

  remove(num, node = this.root) {
    if (node === null) return node;
    if (num > node.data) {
      node.right = this.remove(num, node.right);
    } else if (num < node.data) {
      node.left = this.remove(num, node.left);
    } else {
      //no child
      if (node.left === null && node.right === null) {
        node = null;
        // one child
      } else if (node.left === null) {
        node = node.right;
      } else if (node.right === null) {
        node = node.left;
      } else {
        //two children
        const newNode = this.minValue(node.right);
        node.data = newNode.data;
        node.right = this.remove(newNode.data, node.right);
      }
    }
    return node;
  }

  minValue(node) {
    if (node.left === null) return node;
    return this.minValue(node.left);
  }

  find(num, node = this.root) {
    if (num === node.data) return node;

    if (num < node.data) return this.find(num, node.left);
    if (num > node.data) return this.find(num, node.right);
  }

  levelOrder(funcn = this.creatArray) {
    const result = [];
    if (this.root === null) {
      return result;
    }
    const queue = [this.root];

    while (queue.length > 0) {
      const node = queue.shift();

      funcn(result, node.data);

      if (node.left !== null) funcn(queue, node.left);
      if (node.right !== null) funcn(queue, node.right);
    }
    return result;
  }

  inorder(node = this.root, fun = this.creatArray, result = []) {
    if (node) {
      this.inorder(node.left, fun, result);
      fun(result, node.data);
      this.inorder(node.right, fun, result);
    }
    return result;
  }

  creatArray(arr, value) {
    arr.push(value);
  }

  postorder(node = this.root, fun = this.creatArray, result = []) {
    if (node) {
      this.postorder(node.left, fun, result);
      this.postorder(node.right, fun, result);
      fun(result, node.data);
    }
    return result;
  }

  preorder(node = this.root, fun = this.creatArray, result = []) {
    if (node) {
      fun(result, node.data);
      this.preorder(node.left, fun, result);
      this.preorder(node.right, fun, result);
    }
    return result;
  }

  height(root = this.root) {
    if (!root) return 0;

    let heightLeft = this.height(root.left);
    let heightright = this.height(root.right);

    if (heightLeft > heightright) {
      return heightLeft + 1;
    } else {
      return heightright + 1;
    }
  }
  depth(node = this.root) {
    if (node === null) return 0;
    const leftDepth = this.depth(node.left);
    const rightDepth = this.depth(node.right);
    return Math.max(leftDepth, rightDepth) + 1;
  }

  isBalance(node = this.root) {
    const left = this.height(node.left);
    const right = this.height(node.right);
    const balance = Math.abs(left - right);
    if (balance < 2) return true;
    else return false;
  }

  rebalance() {
    const arr = this.levelOrder();
    const newRoot = this.sortedArrayToBST(arr, 0, arr.length - 1);
    this.root = newRoot;
    return newRoot;
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const num = new BST(arr);
prettyPrint(num.root);
//console.log(num.insert(1));
//num.insert(10);
// num.remove(67);
//num.remove(7);
// num.remove(3);
// num.remove(1);
//num.remove(9);
//num.remove(67);
//console.log(num.find(324));
//console.log(num.levelOrder());
// console.log(num.inorder());
// console.log(num.postorder());
// console.log(num.preorder());
// console.log(num.height());
// console.log(num.depth());
// console.log(num.isBalance());
//prettyPrint(num.root);
num.rebalance();
prettyPrint(num.root);
