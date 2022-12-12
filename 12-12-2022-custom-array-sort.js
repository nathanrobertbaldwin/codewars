let arr = [25,1,21,5,6,5,7,12,2,5,63,6,23,8,23,5,1,23,3,6,634,7,34,3,11,1,2,2]

customSort = (arr) => {
  if (arr[0] > arr[1]) {
    let swap = arr.splice(1,1);
    arr.unshift(...swap)
  }
  for (let i = 1; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[i]) {
        let jRemoved = arr.splice(j, 1);
        arr.splice(i, 0 , ...jRemoved)
      }
    }
  }
  return arr;
}

customSort(arr)
console.log(arr)
