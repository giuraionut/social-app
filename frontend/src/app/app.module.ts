import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PostItemComponent } from './items/post-item/post-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { PostDetailsComponent } from './pages/post-page/post-page.component';
import { NavbarItemComponent } from './items/navbar-item/navbar-item.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MenuBarComponent } from './items/menu-bar/menu-bar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TopCommunitiesItemComponent } from './items/top-communities-item/top-communities-item.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { RecentPostsItemComponent } from './items/recent-posts-item/recent-posts-item.component';
import { CommunityDetailsComponent } from './items/community-details/community-details.component';
import { KNumberFormatterService } from './pipes/k-number-formatter.service';
import { TimePassed } from './pipes/time-passed.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { RouterGuard } from './services/router-guard.service';
import { RegisterItemComponent } from './items/register-item/register-item.component';
import { LoginItemComponent } from './items/login-item/login-item.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ProfileItemComponent } from './items/profile-item/profile-item.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AccSettingsItemComponent } from './items/settings-item/settings-item.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Interceptor } from './services/http-interceptor.service';
import { AuthService } from './services/auth.service';
import { CommunityItemComponent } from './items/community-item/community-item.component';
import { ChangeEmailDialogComponent } from './items/dialogs/change-email-dialog/change-email-dialog.component';
import { ChangePasswordDialogComponent } from './items/dialogs/change-password-dialog/change-password-dialog.component';
import { DeleteAccDialogComponent } from './items/dialogs/delete-acc-dialog/delete-acc-dialog.component';
import { NotFoundItemComponent } from './items/not-found-item/not-found-item.component';
import { CreateCommunityDialogComponent } from './items/dialogs/create-community-dialog/create-community-dialog.component';
import { CommentItemComponent } from './items/comment-item/comment-item.component';
import { CommunityPageComponent } from './pages/community-page/community-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    PostItemComponent,
    CommentItemComponent,
    PostDetailsComponent,
    NavbarItemComponent,
    MenuBarComponent,
    TopCommunitiesItemComponent,
    RecentPostsItemComponent,
    CommunityDetailsComponent,
    KNumberFormatterService,
    TimePassed,
    WelcomePageComponent,
    RegisterItemComponent,
    LoginItemComponent,
    ProfilePageComponent,
    ProfileItemComponent,
    SettingsPageComponent,
    AccSettingsItemComponent,
    CommunityItemComponent,
    ChangeEmailDialogComponent,
    ChangePasswordDialogComponent,
    DeleteAccDialogComponent,
    NotFoundItemComponent,
    CreateCommunityDialogComponent,
    CommunityPageComponent,

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
    MatMenuModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule,
    HttpClientModule,
  ],
  providers: [
    RouterGuard,
    HttpClient,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
