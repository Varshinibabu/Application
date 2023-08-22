import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppcomponentComponent } from './appcomponent/appcomponent.component';
import { CrudComponent } from './crud/crud.component';

const routes: Routes = [
  { path: 'crud', component: CrudComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  
  ],

  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
