import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PortalComponent } from './portal/portal.component';

const routes: Routes = [
  {
   path:'',
   loadChildren:() => import("./modules/auth/auth.module").then(x => x.AuthModule) 
  },
  {
    path:'students',
    loadChildren:() => import("./modules/students/students.module").then(x => x.StudentsModule)
  },
  {
    path:'portal',
    component: PortalComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
