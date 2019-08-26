/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  console.log('javascript-worker');
  let result = 0;
  let times = []; // reset timer


  for(let i = 0; i< data.iterations; i++){
    const start = new Date().getTime();
    if(data.useRecursion){
      result = fibonacciWithRecursion(data.index);
    }else{
      result = fibonacciWithLoop(data.index);
    }
    
    times.push((new Date().getTime()).valueOf() - start.valueOf());
  }
  
  const totalTime= (times.reduce((a, b) => a + b, 0));
  const averageTime = Math.round((totalTime/ data.iterations) * 100) / 100;
  postMessage({result, totalTime, averageTime});
});



function fibonacciWithRecursion(n: number): number {
  if (n === 0 || n === 1) {
    return n;
  } else {
    return (fibonacciWithRecursion(n - 1) + fibonacciWithRecursion(n - 2));
  }
}

function fibonacciWithLoop(n: number): number {
  if(n===0) return 0;
  if(n===1) return 1;

  var last = 0;
  var current = 1;
  var temp;

  for (var idx =2; idx <= n; idx++){
    temp = current;
    current = last + current;
    last = temp;
  }

  return current;
}