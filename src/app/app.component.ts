import { Component } from '@angular/core';
import { FibonacciService } from './fibonacci.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  // default values
  index: number = 40;
  iterations: number = 3;
  useRecursion: boolean =true;
  version: string = environment.version;
  
  constructor(private fibonacciService: FibonacciService) {}

  submitWithReturn(event: any) {
    if (event.keyCode === 13) {
      this.run();       
    }
  }

  setAlgorithm(){
    if(this.useRecursion){
      this.iterations = 3;
      this.index = 40;
    } else{
      this.iterations = 1000000;
      this.index = 70;
    }
  }

  run(){
    // console.log(this.useRecursion);
    this.fibonacciService.setChartData(null, true);
    this.fibonacciService.setParams({
      index: this.index, 
      iterations: this.iterations, 
      useRecursion: this.useRecursion,
      useWorker: true
    });
  }

}


