// What's happening here? Array destructuring?

function swapData(array, index1, index2) {
    [array[index1], array[index2]] = [array[index2], array[index1]]
}


function bubbleSort(array) {
    let noSwaps = true;
    for (let j = array.length - 1; j >= 0; j--) {
        for (let i = 0; i < array.length - 1; i++) {
            let first = array[i];
            let next = array[i + 1];
            if (first > next) {
                noSwaps = false; // Use the noSwaps variable as a switch. If there weren't any swaps on the last round, break;
                swapData(array, i, i + 1)
            }
        }
        if (noSwaps) break;
    }
    return array;
}

let arr = [83, 26, 1, 92, 1, 27, 15, 52, 35];
console.log(arr.length);

console.log(bubbleSort(arr))

console.log(arr.length)
