import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Artist } from '../artist-list/models/artist.models';
import { ArtistService } from '../artist-list/service/artist.service';
import { Song } from '../song-list/models/song.models';
import { SongService } from '../song-list/service/song.service';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Subject } from "rxjs"
import { takeUntil } from "rxjs/operators"
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  
  componentSubs$: Subject<boolean> = new Subject();
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        max: 10
      }
    },
    plugins: {
      legend: {
        display: true,
      }
    }
  };
  barChartType: ChartType = 'bar';

  barChartData: ChartData<'bar'> = {
    labels: [ 'Total' ],
    datasets: [
      { data: [ 5 ], label: 'Songs' },
      { data: [ 10 ], label: 'Artists' }
    ]
  };

  constructor(public songsService: SongService,
    public artistService: ArtistService) {}

  ngOnInit(): void {
    
    this.songsService.Store$
    .pipe(takeUntil(this.componentSubs$))
    .subscribe((res => {
      this.barChartData.datasets[0].data[0] = res.songs.length;
      this.chart?.update();
    }));

    this.artistService.Store$
    .pipe(takeUntil(this.componentSubs$))
    .subscribe((res => { 
      this.barChartData.datasets[1].data[0] = res.artists.length;
      this.chart?.update();
    }));

  }

  onSaveNewSong(newSong: Song) {
    this.songsService.addSong(newSong);
  }

  onSaveNewArtist(newArtist: Artist) {
    this.artistService.addArtist(newArtist);
  }

  // setExpToken() {
  //   localStorage.clear()
  //   const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pbHNvbkBlbWFpbC5jb20iLCJwYXNzd29yZCI6Im5pbHNvbiIsImlhdCI6MTY1MDEwNjI5OSwiZXhwIjoxNjUwMTA5ODk5fQ.t0rZ8wI7YNvf_9t0Voq-08gJEijCFivZ14g0YQp3Few`;
  //   localStorage.setItem('token', token) 
  // }

  refreshPage() {
    window.location.reload()
  }

  ngOnDestroy(): void {
    this.componentSubs$.next(true);
    this.componentSubs$.complete();
  }

}
