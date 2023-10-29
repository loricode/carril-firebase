import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';

//modulo para agrupar los paquetes que se van a utilizar para otros modulos
import { CoreModule } from '../core/core.module';
import { SignInComponent } from './sign-in/sign-in.component';

@NgModule({
  declarations: [
    RegisterComponent,
    SignInComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    AuthRoutingModule
  ],

})
export class AuthModule { }
