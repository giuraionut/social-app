import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PostDetailsComponent } from './pages/post-details/post-details.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';

import { RouterGuard } from './services/router-guard.service';
const routes: Routes = [
  {
    path: 'socialapp/home',
    component: HomeComponent,
    canActivate: [RouterGuard],
  },
  {
    path: 'socialapp/post/:postId',
    component: PostDetailsComponent,
    canActivate: [RouterGuard],
  },
  { path: 'socialapp/welcome', component: WelcomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
