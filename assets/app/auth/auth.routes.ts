import { LogoutComponent } from './logout.component';
import { SigninComponent } from './signin.component';
import { SignupComponent } from './signup.component';
import { Component } from '@angular/core';
import { Routes } from '@angular/router';

export const AUTH_ROUTES : Routes = [
    {path: '', redirectTo: 'signup', pathMatch: 'full'},    
    {path: 'signup', component: SignupComponent},
    {path: 'signin', component: SigninComponent},
    {path: 'logout', component: LogoutComponent}
];