import { Component, OnInit, ViewChild } from '@angular/core';
import { FibonacciService } from '../fibonacci.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, BaseChartDirective } from 'ng2-charts';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit  {
  @ViewChild(BaseChartDirective, null) chartRef: BaseChartDirective;

  hide = true;

  public barChartOptions: ChartOptions = {
    responsive: true,
    
    scales: { xAxes: [{}], yAxes: [{
          ticks: {
              beginAtZero: true
          }
      }] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'ms', backgroundColor:[] },
  ];

  constructor(private fibonacciService: FibonacciService) {
    
  }

  ngOnInit(){
    this.fibonacciService.chartData$.subscribe(data=> {      
      if(data.length==0 && this.chartRef.chart!= undefined){
        this.hide = true;
        this.barChartData[0].data = [];
        this.barChartLabels = [];
          
        this.chartRef.chart.update();
      }

      if(data.length==4){
        let colors = [];
        data.sort((a,b)=> {return a.value-b.value}).forEach(d=>{
          
          //console.log(this.barChartData[0].backgroundColor);
          this.barChartData[0].data.push(d.value);
          this.barChartLabels.push(d.name);
          colors.push(d.color);
        });

        this.barChartData[0].backgroundColor = colors; //['#F4D03F', '#2ECC71', '#EC7063', '#3498DB'];
        this.chartRef.chart.update();
        this.hide = false;
      }
    });
  }

}
