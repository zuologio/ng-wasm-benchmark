import { Component, OnInit } from '@angular/core';
import { FibonacciService } from '../fibonacci.service';



@Component({
  selector: 'app-javascript',
  template: `<div *ngIf="result!=0">
  <h4 [style.color]="color">javascript</h4>
  <pre>
  <code>no external compilation required</code>
</pre>
  <p>Elapsed total time: <strong>{{totalTime}}</strong>ms <br>
      Elapsed average time: <strong>{{averageTime}}</strong>ms<br>
      Result: <strong>{{result}}</strong></p>
  <hr>
</div>
<div *ngIf="isLoading"><p>Loading javascript...</p></div>`,
})
export class JavascriptComponent implements OnInit {
  color ='#3498DB';
  result = 0;
  averageTime: number;
  totalTime: number;
  isLoading = false;

  constructor(private fibonacciService: FibonacciService) { }

  ngOnInit(){
    this.fibonacciService.params$.subscribe(p=>{
      const params = p as any;

      if(params==null || params.index==null || params.iterations == null){
        return;
      }

      // reset logic
      this.result = 0; 
      this.isLoading = true;

      if (typeof Worker !== 'undefined' || !params.useWorker ) {
        const worker = new Worker('./javascript-worker.worker', {name: 'javascript', type: 'module' });

        worker.onmessage = ({ data }) => {
          this.averageTime = data.averageTime;
          this.totalTime = data.totalTime;
          this.result = data.result;
          this.isLoading = false;
          
          this.fibonacciService.setChartData({
            'name': 'javascript',
            'value': this.totalTime,
            'color': this.color
          }, false);
        };
        worker.postMessage(params);
      } else {
        
        let times = []; // reset timer
      
      
        for(let i = 0; i< params.iterations; i++){
          const start = new Date().getTime();
          if(params.useRecursion){
            this.result = this.fibonacciWithRecursion(params.index);
          }else{
            this.result = this.fibonacciWithLoop(params.index);
          }
          
          times.push((new Date().getTime()).valueOf() - start.valueOf());
        }
        
        this.totalTime= (times.reduce((a, b) => a + b, 0));
        this.averageTime = Math.round((this.totalTime/ params.iterations) * 100) / 100;

        this.fibonacciService.setChartData({
          'name': 'javascript',
          'value': this.totalTime,
          'color': this.color
        }, false);
      }
    });
  }

  fibonacciWithRecursion(n: number): number {
    if (n === 0 || n === 1) {
      return n;
    } else {
      return (this.fibonacciWithRecursion(n - 1) + this.fibonacciWithRecursion(n - 2));
    }
  }
  
  fibonacciWithLoop(n: number): number {
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
}
