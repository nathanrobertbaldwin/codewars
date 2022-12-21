class Node {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

class LinkedList {
    constructor () {
        this.head = null;
        this.tail = null;
        this.data = null;
    }
    addStringToTail (string) {

        if (string === " null") return null;

        let split = string.split (" -> ").reverse();

        split = split.filter(ele => ele !== "null").map(ele =>{
           return ele = parseInt(ele)
        })

        split.forEach(ele => {
            let newNode = new Node (ele)
            if (!this.head) this.head = newNode;
            else {
                let oldHead = this.head;
                this.head = newNode;
                newNode.next = oldHead;
            }
            this.data = newNode;
        });

    }

    returnData () {
        return this.data;
    }
}

parse = (string) => {
    let list = new LinkedList;
    list.addStringToTail(string);
    return list.returnData();
}


console.log(parse("0 -> 1 -> 4 -> 9 -> 16 -> null")) // new Node(1, new Node(2, new Node(3)))
