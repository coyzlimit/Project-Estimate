import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './pages/add/add.component';
import { ViewComponent } from './pages/view/view.component';

const routes: Routes = [
  {path: '', redirectTo: 'add', pathMatch: 'full'},
  {path: 'add', component: AddComponent},
  {path: 'view', component: ViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
