// 冒泡排序(Bubble sort）
function bubbleSort(arr) {
  console.time('耗时');
  for(let j = 0; j < arr.length - 1; j++) {
    let isOk = true;
    for (let i = 0; i < arr.length - 1 - j; i++) {
      if(arr[i] > arr[i+1]){
        [arr[i], arr[i+1]] = [arr[i+1], arr[i]];
        isOk = false;
      }
    }
    if(isOk){
      break;
    }
  }
  console.timeEnd('耗时');
  return arr;
}

// 选择排序(Selection Sort)
function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) { // arr.length - 1是因为假定数组中n个数，比较需要两个数，所以只需要比较n-1次
    let minIndex = i; // 记录每次循环开始位置，等待和最小值交换位置
    for (let j = i+1; j < arr.length; j++) { // j+1 是避免比较自身，j永远是i的后一项，让他们俩做比较
      if (arr[j] < arr[minIndex]) { // 如果后面的值小于前面的值，需要调换他们俩位置
        minIndex = j; // 保存最小值的下标
      }
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]] // 使用es6的结构语法交换值，把最小值放到数组最前面
  }
  return arr;
}

// 插入排序(Insertion Sort)
function insertionSort(arr){
  for (let i = 1; i < arr.length; i++) { // 循环未排序部分, i=1而不是0是因为默认0项为已排序部分
    let t1 = arr[i]
    for(var j = i-1; j >= 0; j--){ // 循环已排序部分，默认数组第一项有且只有第一项，下标范围为(0 - (未排序元素下标-1))，也就是例子中的i-1
      let t2 = arr[j];
      // 这里使用t1而不使用arr[i]的原因是因为数组arr排序正在发生变化，t1可能不等于arr[i]
      if(t1 < t2){ // 如果未排序元素比已排序元素小，
        arr[j+1] = t2; // 把已排序元素向后移动一位(j+1)，空出他的坑位，等循环完毕后，把未排序元素插入这个坑位
      }else{
        break; // 如果判断不成立，跳出内循环
      }
    }
    // 内循环完毕，一定会找到一空位置，这时候我们把这次循环的未排序元素也就是arr[i]，插入这个位置。
    // 为什么是j+1，这里有两种情况：
    // 1: 内部没执行break的循环，最后一次循环先执行j--，然后比对是否要跳出循环，这里的跳出条件是j>=0，那么j在跳出循环后一定是-1。 所以j+1变成数组第0项
    // 2: 碰巧内部执行了break，就不执行j--了。也就是已排序数组中每一项都比未排序元素小，那就不需要移位，直接把未排序数据插入在已排序数组最后。由于当前要排序的元素每次循环正好就在已排序数组的最后，也就是由于j的初始化等于i-1，那j+1插入即可
    arr[j+1] = t1;  // 这里使用arr[j+1]而不使用arr[i]也是因为arr排序正在发生变化，arr[j+1]可能不等于arr[i]
  }
  return arr
}

// 快速排序(Quick Sort)
function quickSort(arr){ 
  if (arr.length <= 1) { return arr } // 必须要写这条，数组分解成只有一项的时候，不需要排序了，直接return，否则会报错，堆栈溢出
  let pointIndex = Math.floor(arr.length / 2); // 在大约中间位置取一下标作为基准点
  var point = arr.splice(pointIndex, 1)[0];  // 分离pointIndex和原数组arr的关系
  let left = [];
  let right = [];
  for(let i = 0; i < arr.length; i++){
    // 循环排序数组，小的放在left中，大的放在right中
    if(arr[i] < point){
      left.push(arr[i])
    }else{
      right.push(arr[i])
    }
  }
  // 递归，让每一个left和right继续排序，直到left或right只有一项为止
  return quickSort(left).concat(point, quickSort(right));
}