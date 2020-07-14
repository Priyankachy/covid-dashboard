import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { DescriptiveComponent } from './descriptive/descriptive.component';
import { HelplineComponent } from './helpline/helpline.component';



const routes: Routes = [
  {
    path: '',
    component: OverviewComponent
  },
  {
    path: 'overview',
    component: OverviewComponent
  },
  {
    path: 'descriptive',
    component: DescriptiveComponent
  },
  {
    path: 'helpline',
    component: HelplineComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
