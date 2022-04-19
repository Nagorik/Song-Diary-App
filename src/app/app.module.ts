import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderInterceptor } from './@core/interceptors/header.interceptor';
import { SongsArtistsInputComponent } from './components/song-input/songs-artists-input.component';
import { CapitalizeFirstDirective } from './shared/directives/capitalize.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SongListComponent } from './song-list/song-list.component';
import { ToastrModule } from 'ngx-toastr';
import { ArtistListComponent } from './artist-list/artist-list.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app.routing.module';
import { NgChartsModule } from 'ng2-charts';
import { GlobalHttpRequestError } from './@core/interceptors/error-handle.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    SongsArtistsInputComponent,
    CapitalizeFirstDirective,
    SongListComponent,
    ArtistListComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgChartsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalHttpRequestError,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
