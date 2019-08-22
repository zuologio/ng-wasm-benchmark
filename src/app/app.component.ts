import { Component } from '@angular/core';
import { FibonacciService } from './fibonacci.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Wasm Benchmark';
  
  index: number = 40;
  iterations: number = 1;
  
  constructor(private fibonacciService: FibonacciService) {}

  submitWithReturn(event: any) {
    if (event.keyCode === 13) {
      this.run();   
    }
  }

  run(){
    setTimeout(() => {
      this.fibonacciService.setParams({index: this.index, iterations: this.iterations});
    });
  }
}


