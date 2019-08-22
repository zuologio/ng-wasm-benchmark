import { Component, OnInit } from '@angular/core';
import { WasmCppService } from './wasm-cpp.service';
import { FibonacciService } from '../fibonacci.service';

@Component({
  selector: 'app-wasm-cpp',
  template: `<div *ngIf="averageTime!=0">
  <h4>c++</h4>
  <pre>
  <code>em++ fibonacci.cpp -O3 -s WASM=1 -s ENVIRONMENT="web" --memory-init-file 0 -s MODULARIZE=1 -o fibonacci.js</code>
</pre>
  <p>Elapsed total time: <strong>{{totalTime}}</strong>ms <br>
      Elapsed average time: <strong>{{averageTime}}</strong>ms<br>
      Result: <strong>{{result}}</strong></p>
  <hr>
</div>`
})
export class WasmCppComponent implements OnInit {

  result = 0;
  averageTime: number;
  totalTime: number;
  
  constructor(private wasmCppService: WasmCppService,
              private fibonacciService: FibonacciService) {}

  ngOnInit(){
    this.fibonacciService.params$.subscribe(p=>{
      const params = p as any;
      this.averageTime= 0;

      if(params == null || params.index==null || params.iterations == null){
        return;
      }
  
      let times = []; // reset timer
      for(let i = 0; i< params.iterations; i++){
        const start = new Date().getTime();
        this.wasmCppService.fibonacci(params.index).subscribe(r=>{
          this.result = r;
          times.push((new Date().getTime()).valueOf() - start.valueOf());
        });
      }
     
      this.totalTime= (times.reduce((a, b) => a + b, 0));
      this.averageTime = Math.round((this.totalTime/ params.iterations) * 100) / 100;
    }); 
  }
}
