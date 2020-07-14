
import { Component, OnInit, NgModuleFactory, Compiler, SimpleChanges, NO_ERRORS_SCHEMA} from '@angular/core';
import * as Highcharts from 'highcharts';
import { interval, Subscription } from 'rxjs';
import { DataServiceService } from 'src/app/data-service.service';
import { getCurrencySymbol } from '@angular/common';




@Component({
  selector: 'app-statechart',
  templateUrl: './statechart.component.html',
  styleUrls: ['./statechart.component.css']
})
export class StatechartComponent implements OnInit {
  latIndiaCovidData;
  locations = [];
  highcharts = Highcharts;
  series = [];
  chartOptions;
  dischargedPatients = [];
  deathPatients = [];
  totalConfirmedPatients = [];
  totalConfirmesIndians = [];
  totalConfirmedForeigns = []

constructor(private apiService: DataServiceService){}

ngOnInit(){
  this.plotGrpahForLatestIndiaData();
    
}
plotGrpahForLatestIndiaData() {
  this.apiService.getLatestIndiaData().subscribe((res:any) =>{
    this.latIndiaCovidData = res
    this.showGraph(this.latIndiaCovidData);
  });
}

private showGraph(covidData){
  let regionsData = covidData['data'].regional
  for(let index in regionsData){
    this.locations.push(regionsData[index]['loc']);
    this.dischargedPatients.push(regionsData[index]['discharged']);
    this.deathPatients.push(regionsData[index]['deaths']);
    this.totalConfirmedPatients.push(regionsData[index]['totalConfirmed']);
    this.totalConfirmesIndians.push(regionsData[index]['confirmedCasesIndian']);
    this.totalConfirmedForeigns.push(regionsData[index]['confirmedCasesForeign']);
  }
  console.log(this.locations)

  this.chartOptions = {
    chart: {
      type: 'column',
      height:"500px",
      width: 1000,
      spacingLeft:1,
      spacingRight:1,
      // plotBackgroundColor: '#0e3342',
    
      //plotBackgroundImage:'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/news/2020/01_2020/coronavirus_1/1800x1200_coronavirus_1.jpg?resize=*:350px'
  },
  title: {
      text: 'India Current Covid status'
  },
  subtitle: {
      text: 'Source: api.rootnet.in'
  },
  xAxis: {
      categories: this.locations,
      crosshair: true,
      
  },
  yAxis: {
      
      min: -70,
        startOnTick: false,
      title: {
          text: 'Count'
      }
  },
  tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y} persons</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
  },
  plotOptions: {
      column: {
          pointPadding: 0.2,
          borderWidth: 0
      }
  },
  series: [{
      name: 'Discharged',
      data: this.dischargedPatients,
      color:'green'

  }, {
      name: 'Deaths',
      data: this.deathPatients,
      color:'red'

  }, {
      name: 'Total Confirmed',
      data: this.totalConfirmedPatients,
      color:'blue'
  }  

]
  };
}

}
