import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { PostComponent } from './items/post/post.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { CommentComponent } from './items/comment/comment.component';
import { PostdetailsComponent } from './pages/postdetails/postdetails.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, PostComponent, CommentComponent, PostdetailsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
