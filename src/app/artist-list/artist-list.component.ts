import { Component, OnInit } from '@angular/core';
import { Artist } from './models/artist.models';
import { ArtistService } from './service/artist.service';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss']
})
export class ArtistListComponent implements OnInit {

  constructor(public artistService: ArtistService) { }

  ngOnInit(): void {
  }

  onSaveNewArtist(newArtist: Artist) {
    this.artistService.addArtist(newArtist)
  }

  onDeleteArtist(artist: Artist) {
    this.artistService.deleteArtist(artist) 
  }

}
