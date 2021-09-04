import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PostdetailsComponent } from './pages/postdetails/postdetails.component';
const routes: Routes = [
  { path: 'socialapp/home', component: HomeComponent },
  { path: 'socialapp/post', component: PostdetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
