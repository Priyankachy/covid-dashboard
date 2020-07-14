import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { OverviewComponent } from './overview/overview.component';
import { DescriptiveComponent } from './descriptive/descriptive.component';
import { HelplineComponent } from './helpline/helpline.component';
import { HttpClientModule } from '@angular/common/http';
import { StatechartComponent } from './overview/statechart/statechart.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { MapComponent } from './map/map.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    OverviewComponent,
    DescriptiveComponent,
    HelplineComponent,
    StatechartComponent,
    MapComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HighchartsChartModule,
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
