import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/data-service.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
latestData:any;
confirmedCasesIndia;
recoveredCasesIndia;
deathCasesIndia;
latestWorldData;
confirmedCasesWorld;
recoveredCasesWorld;
deathCasesWorld;
  constructor(private dataService:DataServiceService) { }

  ngOnInit(): void {
    this.getLatestData();
  }
private getLatestData(){

  this.dataService.getLatestIndiaData().subscribe(data =>{
    this.latestData=data;
    console.log(this.latestData);
    this.confirmedCasesIndia=this.latestData.data.summary.total;
    this.recoveredCasesIndia=this.latestData.data.summary.discharged;
    this.deathCasesIndia=this.latestData.data.summary.deaths;
    
  });

  this.dataService.getLatestWorldData().subscribe(data =>{
    this.latestWorldData=data;
  console.log(this.latestWorldData);
    this.confirmedCasesWorld=this.latestWorldData.data.confirmed;
    this.recoveredCasesWorld=this.latestWorldData.data.recovered;
    this.deathCasesWorld=this.latestWorldData.data.deaths;
    
  });
}

}
