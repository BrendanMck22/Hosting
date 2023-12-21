import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AppComponent } from './app.component';
const routes: Routes = [  
  // { path: 'main', component: AppComponent },
  {path: 'landing', component: LandingPageComponent},
  // { path: '', component: AppComponent, pathMatch:'full' },
  // otherwise redirect to home
  // {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
