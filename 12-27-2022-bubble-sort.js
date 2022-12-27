function swapData(array, index1, index2) {
    let first = array[index1];
    let next = array[index2];
    array[index1] = next;
    array[index2] = first;
    return array;
}

function bubbleSort(array) {
    for (let j = array.length - 1; j >= 0; j--) {
        for (let i = 0; i < array.length - 1; i++) {
            let first = array[i];
            let next = array[i + 1];
            if (first > next) {
                swapData(array, i, i + 1)
            }
        }
    }
    return array;
}

let arr = [83, 26, 1, 92, 1, 27, 15, 52, 35];
console.log(arr.length);

console.log(bubbleSort(arr))

console.log(arr.length)
