// Given an array of positive ints and an int num, find the minimum length
// of a subarray such that the sum of the elements of the subarray is
// greater than or equal to the num.
// i: arr, num
// o: integer length
//

function minSubArrayLen(array, num) {
    let startIndex = 0;
    let endIndex = array.length - 1;
    let subArraySum = array.reduce((accum, currVal) => accum += currVal, 0);

    if (subArraySum < num) return 0;

    while (subArraySum >= num) {
        if (array[startIndex] <= array[endIndex]) {
            let toRemove = array[startIndex];
            if ((subArraySum - toRemove) < num) return (endIndex - startIndex) + 1;
            subArraySum -= toRemove;
            startIndex++;
        } else {
            let toRemove = array[endIndex];
            if ((subArraySum - toRemove) < num) return (endIndex - startIndex) + 1;
            subArraySum -= toRemove;
            endIndex--;
        }
    }
}

console.log(minSubArrayLen([2, 3, 1, 2, 4, 3], 7)) // 2 -> because [4,3] is the smallest subarray
console.log(minSubArrayLen([2, 1, 6, 5, 4], 9)) // 2 -> because [5,4] is the smallest subarray
console.log(minSubArrayLen([3, 1, 7, 11, 2, 9, 8, 21, 62, 33, 19], 52)) // 1 -> because [62] is greater than 52
console.log(minSubArrayLen([1, 4, 16, 22, 5, 7, 8, 9, 10], 39)) // 3
console.log(minSubArrayLen([1, 4, 16, 22, 5, 7, 8, 9, 10], 55)) // 5
console.log(minSubArrayLen([4, 3, 3, 8, 1, 2, 3], 11)) // 2
console.log(minSubArrayLen([1, 4, 16, 22, 5, 7, 8, 9, 10], 95)) // 0
