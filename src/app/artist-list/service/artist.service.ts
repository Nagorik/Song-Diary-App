import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from 'src/app/@core/store/store';
import { environment } from 'src/environments/environment';
import { Artist, ArtistState, initState } from '../models/artist.models';

@Injectable({
  providedIn: 'root'
})
export class ArtistService extends Store<ArtistState> {
  
  apiUrl: string = ''
  
  constructor(private httpClient: HttpClient) {
    super(initState)
    this.apiUrl = environment.apiHost + 'artists';
    this.loadArtists()
  }

  loadArtists() {
    this.httpClient.get<Artist[]>(this.apiUrl+'?_sort=id&_order=desc').subscribe((res => {
      const artists = { artists: [...res] };
      this.setState(artists);
    }))
  }

  addArtist(newArtist: Artist) {
    this.httpClient.post<Artist>(this.apiUrl, newArtist).subscribe((res => {
      const newState = { ...this.state, artists: [ res, ...this.state.artists ] };
      this.setState(newState);
    }))
  }

  deleteArtist(deleteArtist: Artist) {
    this.httpClient.delete(`${this.apiUrl}/${deleteArtist.id}`).subscribe((res => {
      const newState = { ...this.state, artists: this.state.artists.filter(artist => artist.id !== deleteArtist.id)  };
      this.setState(newState);
    }))
  }

}
