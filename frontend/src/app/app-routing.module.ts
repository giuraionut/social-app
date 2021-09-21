import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PostDetailsComponent } from './pages/post-details/post-details.component';
const routes: Routes = [
  { path: 'socialapp/home', component: HomeComponent },
  { path: 'socialapp/post', component: PostDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
