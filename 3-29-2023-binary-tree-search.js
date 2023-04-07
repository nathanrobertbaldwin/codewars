class Node {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

// function search(n, root) {
//   let inTree = false;
//   function test(n, root) {
//     if (!root) return;
//     else if (root.value === n) inTree = true;
//     else {
//       test(n, root.left);
//       test(n, root.right);
//     }
//   }
//   test(n, root);
//   return inTree;
// }

function search(n, root) {
  if (!root) return false;
  else if (root.value === n) return true;
  else return search(n, root.left) || search(n, root.right);
}

const root = new Node(666, new Node(555), new Node(444));
console.log(search(444, root)); //, true);
console.log(search(555, root)); //, true);
console.log(search(666, root)); //, true);
console.log(search(777, root)); //, false);
