import { Component, OnInit } from '@angular/core';
import { FibonacciService } from '../fibonacci.service';


@Component({
  selector: 'app-javascript',
  template: `<div *ngIf="averageTime!=0">
  <h4>javascript</h4>
  <pre>
  <code>no external compilation required</code>
</pre>
  <p>Elapsed total time: <strong>{{totalTime}}</strong>ms <br>
      Elapsed average time: <strong>{{averageTime}}</strong>ms<br>
      Result: <strong>{{result}}</strong></p>
  <hr>
</div>`,
})
export class JavascriptComponent implements OnInit {
  result = 0;
  averageTime: number;
  totalTime: number;
  isLoading = false;

  constructor(private fibonacciService: FibonacciService) { }

  ngOnInit(){
    this.fibonacciService.params$.subscribe(p=>{
      const params = p as any;
      
      this.averageTime= 0;
      if(params==null || params.index==null || params.iterations == null){
        return;
      }

      let times = []; // reset timer
      for(let i = 0; i< params.iterations; i++){
        const start = new Date().getTime();
        this.result = this.fibonacciJs(params.index);
        times.push((new Date().getTime()).valueOf() - start.valueOf());
      }
     
      this.totalTime= (times.reduce((a, b) => a + b, 0));
      this.averageTime = Math.round((this.totalTime/ params.iterations) * 100) / 100;
    });

   
  }

  fibonacciJs(n: number): number {
    if (n === 0 || n === 1) {
      return n;
    } else {
      return (this.fibonacciJs(n - 1) + this.fibonacciJs(n - 2));
    }
  }
}
