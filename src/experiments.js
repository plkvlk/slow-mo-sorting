function qs() {
    let array = [1,7,6,9,2,3,4,43,543,12,43,14,35,5];

    function hoarePartition(array, start, end) {
        // let pivotValue = array[Math.floor(start + (end - start) / 2)];
        let pivotValue = array[end];
        let left = start;
        let right = end;
        let counter = 0;

        console.log("Pivot: " + pivotValue);
        console.log("Array at the begining: " + array.slice(start, end + 1));

        while (counter++ < 100) {

            while (array[left] < pivotValue) {
                console.log('left is now: ' + left);
                left++;
            }

            if (left === right) {
                console.log("Array at the end: " + array.slice(start, end + 1));
                console.log("====")
                return right;
            }

            swap(left, right, array);
            right--;


            while (array[right] > pivotValue) {
                console.log('right is now: ' + right);
                right--;
            }

            if (left === right) {
                console.log("Array at the end: " + array.slice(start, end + 1));
                console.log("====")
                return right;
            }

            swap(left, right, array);
            left++;
        }
    }

    function quickSort(array, start, end) {
        if (start <= end) {
            // console.log('starting quicksort(' + start + ', ' + end + ')');
            let index = hoarePartition(array, start, end);
            console.log('index:' + index);

            quickSort(array, start, index - 1);
            quickSort(array, index + 1, end);
        }
    }

    // console.log(hoarePartition(array, 0, array.length - 1));
    quickSort(array, 0, array.length - 1);

    console.log(array);
}

qs();