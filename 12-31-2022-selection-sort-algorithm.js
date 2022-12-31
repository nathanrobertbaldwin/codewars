function selectionSort (array) {
    
    for (let i = 0; i < array.length; i++) {
        let currentMin = array[i]
        let currentMinIdx = i;

        for (let j = i + 1; j < array.length; j++) {
            let testEle = array[j];
            if (testEle < currentMin) {
                currentMin = testEle;
                let temp = array[i];
                array[i] = testEle;
                array[j] = temp;
            }
        }
    }
    return array;
}

let testArray = [5,6,3,4,1,2];

console.log(selectionSort(testArray))