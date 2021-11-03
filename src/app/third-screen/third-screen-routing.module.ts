import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThirdScreenPage } from './third-screen.page';

const routes: Routes = [
  {
    path: '',
    component: ThirdScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThirdScreenPageRoutingModule {}
