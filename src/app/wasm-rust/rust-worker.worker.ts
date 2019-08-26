/// <reference lib="webworker" />

addEventListener('message', async ({ data }) => {
  console.log('rust-worker');
  const wasm = await import('../../assets/rust/pkg/fibonacci_rust');

  let resultL: bigint;
  let resultR: number = 0;
  let times = []; // reset timer


  for(let i = 0; i< data.iterations; i++){
    const start = new Date().getTime();
    if(data.useRecursion){
      resultR = wasm.fibonacci_with_recursion(data.index);
    }else{
      resultL = wasm.fibonacci_with_loop(data.index);
    }
    
    times.push((new Date().getTime()).valueOf() - start.valueOf());
  }
  
  const totalTime= (times.reduce((a, b) => a + b, 0));
  const averageTime = Math.round((totalTime/ data.iterations) * 100) / 100;
  postMessage({result: data.useRecursion ? resultR: resultL, totalTime, averageTime});
});

