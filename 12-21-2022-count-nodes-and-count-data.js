class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

function length(head) {
    if (!head) return 0;
    return head ? 1 + length(head.next) : null;
}

function count(head, data) {
    if (!head) return 0;
    return head.data === data ? 1 + count(head.next, data) : count(head.next, data);

}
