import { Component, OnInit } from '@angular/core';
import { FibonacciService } from '../fibonacci.service';

@Component({
  selector: 'app-wasm-rust',
  template:`<div *ngIf="averageTime!=0">
  <h4>Rust</h4>
  <pre>
  <code>wasm-pack build</code>
</pre>
  <p>Elapsed total time: <strong>{{totalTime}}</strong>ms <br>
      Elapsed average time: <strong>{{averageTime}}</strong>ms<br>
      Result: <strong>{{result}}</strong></p>
  <hr>
</div>`
})
export class WasmRustComponent implements OnInit {
  wasm: typeof import('../../assets/rust/pkg/fibonacci_rust');
  averageTime: number;
  result=0;
  totalTime: any;

  constructor(private fibonacciService: FibonacciService) {
    this.initWasm();
  }

  async initWasm(){
    this.wasm = await import('../../assets/rust/pkg/fibonacci_rust');
    //this.wasm.init(); // add usefull errors explanation in console!
  }

  ngOnInit() {
    this.fibonacciService.params$.subscribe(p=>{
      const params = p as any;
      this.averageTime= 0;

      if(params == null || params.index==null || params.iterations == null){
        return;
      }
  
      let times = []; // reset timer
      for(let i = 0; i< params.iterations; i++){
        const start = new Date().getTime();
        this.result = this.wasm.fibonacci(params.index);
        times.push((new Date().getTime()).valueOf() - start.valueOf());
      }
     
      this.totalTime= (times.reduce((a, b) => a + b, 0));
      this.averageTime = Math.round((this.totalTime/ params.iterations) * 100) / 100;
      
    });
  }

}
