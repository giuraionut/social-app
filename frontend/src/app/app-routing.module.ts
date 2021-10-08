import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PostDetailsComponent } from './pages/post-page/post-page.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { RouterGuard } from './services/router-guard.service';
import { CommunityPageComponent } from './pages/community-page/community-page.component';
const routes: Routes = [
  {
    path: 'socialapp/home',
    component: HomePageComponent,
    canActivate: [RouterGuard],
  },
  {
    path: 'socialapp/post/:postId',
    component: PostDetailsComponent,
    canActivate: [RouterGuard],
  },
  {
    path: 'socialapp/welcome',
    component: WelcomePageComponent,
  },
  {
    path: 'socialapp/profile',
    component: ProfilePageComponent,
    canActivate: [RouterGuard],
  },
  {
    path: 'socialapp/settings',
    component: SettingsPageComponent,
    canActivate: [RouterGuard],
  },
  {
    path: 'socialapp/community/:title',
    component: CommunityPageComponent,
    canActivate: [RouterGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
