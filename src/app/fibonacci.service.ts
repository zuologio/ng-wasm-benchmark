import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FibonacciService {
  private _params: BehaviorSubject<{}> = new BehaviorSubject<{}>(null);
  params$ = this._params.asObservable();

  private _chartData: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  chartData$ = this._chartData.asObservable();

  constructor() { }

  setParams(params: any):void{
    this._params.next(params);
  }

  setChartData(data: any, clear: boolean):void{
    if(clear){
      this._chartData.next([]);
    }else{
      this._chartData.next(this._chartData.getValue().concat([data]));
    }
  }
}
