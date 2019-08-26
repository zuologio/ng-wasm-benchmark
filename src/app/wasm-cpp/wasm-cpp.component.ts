import { Component, OnInit } from '@angular/core';
import { FibonacciService } from '../fibonacci.service';

@Component({
  selector: 'app-wasm-cpp',
  template: `<div *ngIf="result!=0">
  <h4 [style.color]="color">c++</h4>
  <pre>
  <code>em++ fibonacci.cpp -O3 -s WASM=1 -s ENVIRONMENT="web" --memory-init-file 0 -s MODULARIZE=1 -o fibonacci.js</code>
</pre>
  <p>Elapsed total time: <strong>{{totalTime}}</strong>ms <br>
      Elapsed average time: <strong>{{averageTime}}</strong>ms<br>
      Result: <strong>{{result}}</strong></p>
  <hr>
</div>
<div *ngIf="isLoading"><p>Loading cpp...</p></div>`
})
export class WasmCppComponent implements OnInit {

  color = '#2ECC71';
  result = 0;
  averageTime: number;
  totalTime: number;
  isLoading: boolean =false;
  
  constructor(private fibonacciService: FibonacciService) {}

  ngOnInit(){
    this.fibonacciService.params$.subscribe(p=>{
      const params = p as any;

      if(params == null || params.index==null || params.iterations == null){
        return;
      }
      
       // reset logic
       this.result = 0; 
       this.isLoading = true;

      if (typeof Worker !== 'undefined' ) {
        const worker = new Worker('./cpp-worker.worker', {name: 'cpp', type: 'module' });

        worker.onmessage = ({ data }) => {
          this.averageTime = data.averageTime;
          this.totalTime = data.totalTime;
          this.result = data.result;
          this.isLoading = false;

          this.fibonacciService.setChartData({
            'name': 'c++',
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
