import { Component, OnInit } from '@angular/core';
import { FibonacciService } from '../fibonacci.service';

@Component({
  selector: 'app-wasm-rust',
  template:`<div *ngIf="result!=0">
  <h4 [style.color]="color">Rust</h4>
  <pre>
  <code>wasm-pack build</code>
</pre>
  <p>Elapsed total time: <strong>{{totalTime}}</strong>ms <br>
      Elapsed average time: <strong>{{averageTime}}</strong>ms<br>
      Result: <strong>{{result}}</strong></p>
  <hr>
</div>
<div *ngIf="isLoading"><p>Loading rust...</p></div>`
})
export class WasmRustComponent implements OnInit {
  wasm: typeof import('../../assets/rust/pkg/fibonacci_rust');
  color = '#EC7063';
  averageTime: number;
  result=0;
  totalTime: any;
  isLoading: boolean = false;

  constructor(private fibonacciService: FibonacciService) {
    // this.initWasm();
  }

  // async initWasm(){
  //   this.wasm = await import('../../assets/rust/pkg/fibonacci_rust');
  //   //this.wasm.init(); // add usefull errors explanation in console!
  // }

  ngOnInit() {
    this.fibonacciService.params$.subscribe(p=>{
      const params = p as any;

      if(params == null || params.index==null || params.iterations == null){
        return;
      }
      
       // reset logic
       this.result = 0; 
       this.isLoading = true;

      if (typeof Worker !== 'undefined' ) {
        const worker = new Worker('./rust-worker.worker', {name: 'rust', type: 'module' });

        worker.onmessage = ({ data }) => {
          this.averageTime = data.averageTime;
          this.totalTime = data.totalTime;
          this.result = data.result;
          this.isLoading = false;

          this.fibonacciService.setChartData({
            'name': 'Rust',
            'value': this.totalTime,
            'color': this.color
          }, false);
        };
        
        worker.postMessage(params);
      } else {
        // Web Workers are not supported in this environment.
        // TODO: fallback logic!
      }      
    });
  }

}
