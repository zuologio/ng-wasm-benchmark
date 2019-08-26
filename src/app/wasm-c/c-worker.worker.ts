/// <reference lib="webworker" />
import { filter, map } from "rxjs/operators";
import * as Module from '../../assets/c/fibonacci.js';
import '!!file-loader?name=../../assets/c/fibonacci.wasm!../../assets/c/fibonacci.wasm';
import { Observable, BehaviorSubject } from 'rxjs';
import * as bigInt from "big-integer";


let wasmReady = new BehaviorSubject<boolean>(false);
let mod: any;

/*this is needed because web worker has not direct access to the dom but wasm glue code (js file) refers to window.document, so this is a workaround! */
importScripts('../../assets/fakeDom.js');  

addEventListener('message', async ({ data }) => {
  console.log('c-worker');
  await instantiateWasm('../../assets/c/fibonacci.wasm');
  
  fibonacci(data.index, data.iterations, data.useRecursion).subscribe(r=>{
    postMessage({result: r.result, totalTime: r.totalTime, averageTime: r.averageTime});
  }); 
});


async function instantiateWasm(url: string) {
  // fetch the wasm file
  const wasmFile = await fetch(url);

  // convert it into a binary array
  const buffer = await wasmFile.arrayBuffer();
  const binary = new Uint8Array(buffer);

  // create module arguments
  // including the wasm-file
  const moduleArgs = {
    wasmBinary: binary,
    onRuntimeInitialized: () => {
      wasmReady.next(true)
    }
  };

  // instantiate the module
  mod = Module(moduleArgs)
}

// function fibonacci(input: number): Observable<number> {
//   return wasmReady.pipe(filter(value => value === true)).pipe(
//     map(() => {
//       return mod._fibonacci(input)
//     })
//   );
// }

function fibonacci(input: number, iterations: number, useRecursion: boolean): Observable<any> {
  return wasmReady.pipe(filter(value => value === true)).pipe(
    map(() => {
      let result: any = 0;
      let times = []; // reset timer

      for(let i = 0; i< iterations; i++){
        const start = new Date().getTime();
        if(useRecursion)
        {
          result = mod._fibonacciWithRecursion(input);
        }
        else
        {
          mod._fibonacciWithLoop(input);
          let resMs = bigInt(mod._getResMs());
          let resLs = bigInt(mod._getResLs());
          
          // console.log(resLs);
          // console.log(resMs.shiftLeft(32));
          result = resMs.shiftLeft(32).or(resLs).toString();
        }
        times.push((new Date().getTime()).valueOf() - start.valueOf());  
      }
      const totalTime= (times.reduce((a, b) => a + b, 0));
      const averageTime = Math.round((totalTime/ iterations) * 100) / 100;
      return { result, totalTime, averageTime };
    })
  );
}