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
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { CommentComponent } from './items/comment/comment.component';
import { PostDetailsComponent } from './pages/post-details/post-details.component';
import { NavbarComponent } from './items/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MenuBarComponent } from './items/menu-bar/menu-bar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TopCommunitiesComponent } from './items/top-communities/top-communities.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { RecentPostsComponent } from './items/recent-posts/recent-posts.component';
import { CommunityDetailsComponent } from './items/community-details/community-details.component';
import { KNumberFormatterService } from './pipes/k-number-formatter.service';
import { TimePassed } from './pipes/time-passed.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { RouterGuard } from './services/router-guard.service';
import { RegisterComponent } from './items/register/register.component';
import { LoginComponent } from './items/login/login.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostComponent,
    CommentComponent,
    PostDetailsComponent,
    NavbarComponent,
    MenuBarComponent,
    TopCommunitiesComponent,
    RecentPostsComponent,
    CommunityDetailsComponent,
    KNumberFormatterService,
    TimePassed,
    WelcomeComponent,
    RegisterComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    FlexLayoutModule,
    MatDividerModule,
    MatOptionModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule
  ],
  providers: [RouterGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
