function flatten (array) {
    var newArr = [];
    for (let i = 0; i < array.length; i++) {
        if (Array.isArray(array[i])) {
            newArr = [...newArr, ...flatten(array[i])]
        } else {
            newArr.push(array[i])
        }
    }
    return newArr;
}

// console.log(flatten([[[1]]]))
// console.log(flatten([1, 2, 3, [4, 5] ])) // [1, 2, 3, 4, 5]
console.log(flatten([1, [2, [3, 4], [[5]]]])) // [1, 2, 3, 4, 5]
// console.log(flatten([[1], [2]]))//,[2],[3]])) // [1,2,3]
// console.log(flatten([[[[1], [[[2]]], [[[[[[[3]]]]]]]]]]))// [1,2,3
