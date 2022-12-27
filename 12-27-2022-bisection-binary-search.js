function swapData (array, index1, index2) {
    return [array[index2], array[index1]]
}
function bubbleSort (array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] > array[i + 1]) {
            let swapped = swapData([array[i], array[i + 1], i, i + 1])
        }
    }
    return array;
}

let arr [83, 26, 1, 92, 1, 27, 15, 52, 35];
