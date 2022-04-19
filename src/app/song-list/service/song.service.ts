import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from 'src/app/@core/store/store';
import { initState, Song, SongState } from '../models/song.models';
import { environment as env } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SongService extends Store<SongState> {
  apiUrl: string = ''

  constructor(private httpClient: HttpClient) {
    super(initState);
    this.apiUrl = env.apiHost + 'songs'
    this.loadSongs()
  }

  loadSongs() {
    this.httpClient.get<Song[]>(this.apiUrl+'?_sort=id&_order=desc').subscribe((res => {
      const songs = { songs: [...res] };
      this.setState(songs);
    }))
  }

  addSong(newSong: Song) {
    this.httpClient.post<Song>(this.apiUrl, newSong).subscribe((res => {
      const newState = { ...this.state, songs: [res, ...this.state.songs,] };
      this.setState(newState);
    }))
  }

  deleteSong(deleteSong: Song) {
    this.httpClient.delete(`${this.apiUrl}/${deleteSong.id}`).subscribe((res => {
      const newState = { ...this.state, songs: this.state.songs.filter(song => song.id !== deleteSong.id)  };
      this.setState(newState);
    }))
  }
}
