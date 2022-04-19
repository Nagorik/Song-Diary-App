import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SongService } from '../../song-list/service/song.service';
import { Song, SongState } from '../../song-list/models/song.models';
import { Artist, ArtistState } from 'src/app/artist-list/models/artist.models';
import { ArtistService } from 'src/app/artist-list/service/artist.service';

@Component({
  selector: 'app-songs-artists-input',
  templateUrl: './songs-artists-input.component.html',
  styleUrls: ['./songs-artists-input.component.scss']
})
export class SongsArtistsInputComponent implements OnInit {

  @Input() type: string = 'song';

  @Output() onSubmit: EventEmitter<Song> = new EventEmitter();

  inputForm: FormGroup;
  submitted: boolean = false;
  maxSongsArtists: number = 5;
  
  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private songsService: SongService,
    private artistService: ArtistService
    ) {
    this.inputForm = this.fb.group({ input: [null, [Validators.required, Validators.minLength(5)]] })
  }

  ngOnInit(): void {
    
  }

  get form() { return this.inputForm.controls; }

  submitInput() {
    this.submitted = true;
    if(!this.inputForm.valid) return;
    
    if(this.type == 'song') {
      const newSong: Song = { id: Date.now(), name: this.inputForm.value.input }
      if(this.validateInput(newSong, this.songsService.state.songs)) {
        this.onSubmit.emit(newSong);
        this.inputForm.get('input')?.setValue(null);
        this.submitted = false;
      };
    } else {
      const newArtist: Artist = { id: Date.now(), name: this.inputForm.value.input }
      if(this.validateInput(newArtist, this.artistService.state.artists)) {
        this.onSubmit.emit(newArtist);
        this.inputForm.get('input')?.setValue(null);
        this.submitted = false;
      }
    }
    
  }

  validateInput(newItem: Song, items: Song[] | Artist[]): Boolean {
    if(items.some(item => item.name === newItem.name)) {
      this.toastr.warning(`${this.capitalizeString(this.type)} Already Exists`, 'Warning')
      return false;
    }
    else if(items.length >= this.maxSongsArtists) {
      this.toastr.info('Maximum capacity reached', 'Sorry')
      return false;
    } 
    else {
      return true;
    }
  }

  capitalizeString(text: string) {
    let content = text.charAt(0).toUpperCase() + text.substring(1);
    return content;
  }

}
