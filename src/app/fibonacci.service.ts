import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FibonacciService {
  private _params: BehaviorSubject<{}> = new BehaviorSubject<{}>(null);
  params$ = this._params.asObservable();

  constructor() { }

  setParams(params: any):void{
    this._params.next(params);
  }
}
