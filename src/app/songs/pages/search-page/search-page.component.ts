import { Component } from '@angular/core';
import { SongsService } from '../../services/songs.service';
import { FormControl } from '@angular/forms';
import { Song } from '../../interfaces/songs.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'song-search-page',
  templateUrl: './search-page.component.html',
  styles: ``
})
export class SearchPageComponent {

  public searchInput = new FormControl('');
  public songs: Song[] = [];
  public selectedSong? : Song;

  constructor(private songsService: SongsService){}

  searchSong(){
      const value:string = this.searchInput.value || '';

      this.songsService.getSuggestion(value)
        .subscribe(songs => this.songs = songs);
  }

  onSelectedOption(event: MatAutocompleteSelectedEvent):void{
    if(!event.option.value){
      this.selectedSong = undefined;
      return;
    }
    const song: Song = event.option.value;
    this.searchInput.setValue( song.title );

    this.selectedSong = song;
  }
}
