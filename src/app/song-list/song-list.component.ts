import { Component, OnInit } from '@angular/core';
import { Song } from './models/song.models';
import { SongService } from './service/song.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent implements OnInit {
  
  constructor(public songsService: SongService) { }

  ngOnInit(): void {}

  onSaveNewSong(newSong: Song) {
    this.songsService.addSong(newSong);
  }

  onDeleteSong(song: Song) {
    this.songsService.deleteSong(song)
  }
}
