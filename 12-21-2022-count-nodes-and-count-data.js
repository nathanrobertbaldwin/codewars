class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

function length(head) {

    if (!head) return 0;

    let currNode = head;
    let count = 0;

    while (currNode) {
        count++;
        currNode = currNode.next;
    }
    return count;
}

function count(head, data) {

    if (!head) return 0;

    let currNode = head;
    let count = 0;

    while (currNode) {
        if (currNode.data === data) count++;
        currNode = currNode.next;
    }
    return count;
}
