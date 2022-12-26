class Node {
    // static index = 0;
    constructor(data) {
        this.data = data;
        this.next = null;
        // this.index = Node.index;
        // Node.index++;
    }
}

class LinkedList {
    constructor () {
        this.head = null;
        // this.length = 0;
    }
    addToHead(val) {

        const newNode = new Node (val)

        if (!this.head){
            this.head = newNode;
            // this.length++;
            return this;
        }

        newNode.next = this.head;
        this.head = newNode;
        // this.length++;
        return this;
    }
}

const list = new LinkedList;
list.addToHead(5)
list.addToHead(5)
list.addToHead(5)
list.addToHead(5)
list.addToHead(5)
list.addToHead(3)
list.addToHead(2)
list.addToHead(2)

function removeDuplicates(list) {

    if (!list.head) return null;
    if (!list.head.next) return list;

    let visitedNodes = [];

    let currNode = list.head;
    let nextNode = list.head.next;

    visitedNodes.push(currNode.data);

    while (nextNode) {

        if (!visitedNodes.includes(nextNode.data)) {
            visitedNodes.push(nextNode.data)
            currNode = nextNode;
            nextNode = nextNode.next;

        } else {

            let newNextNode = nextNode.next;

            while (visitedNodes.includes(newNextNode.data)) {
                newNextNode = newNextNode.next;
                if (!newNextNode) {
                    currNode.next = null;
                    return list;
                }
            }

            visitedNodes.push(newNextNode.data)
            nextNode.next = null;
            currNode.next = newNextNode;
            currNode = newNextNode;
            nextNode = newNextNode.next;
        }
    }

  return list;

}

removeDuplicates(list) // === 1 -> 2 -> 3 -> 4 -> 5 -> null
console.log(JSON.stringify(list))
