import { BehaviorSubject, Observable } from 'rxjs';

export class Store<T> {
  private subject: BehaviorSubject<T>;
  Store$: Observable<T>;
  apiUrl: string = ''
  
  constructor(initState: T) {  
    this.subject = new BehaviorSubject<T>(initState);
    this.Store$ = this.subject.asObservable();
  }

  get state() {
    return this.subject.getValue();
  }

  protected setState(nextState: T): void {
    this.subject.next(nextState);
  }
  // private initLoadData() {
  //   this.backendService.getAllSongs().subscribe((res => {
  //     this.subject.next(res)
  //   }))
  // }

  // addSong(newSong: Song) {
  //   let song = this.backendService.saveNewSong(newSong);
  //   song.subscribe((res => { 
  //     this.subject.getValue().push(res);
  //   }))
  // }
}
