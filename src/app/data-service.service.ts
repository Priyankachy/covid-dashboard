import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

constructor(private httpclient: HttpClient) { }

   getLatestIndiaData(){
    return this.httpclient.get("https://api.rootnet.in/covid19-in/stats/latest");
  }

  getLatestWorldData(){
    return this.httpclient.get("https://covid2019-api.herokuapp.com/v2/total");
  }

  getIndiaMap(stateMapURL){
    return this.httpclient.get(stateMapURL);
  }
}
