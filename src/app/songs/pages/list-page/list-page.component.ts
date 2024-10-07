import { Component, OnInit } from '@angular/core';
import { Song } from '../../interfaces/songs.interface';
import { SongsService } from '../../services/songs.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: ``
})
export class ListPageComponent implements OnInit{

    public songs:Song[] =[];


    constructor(private songsService: SongsService){}

  ngOnInit(): void {
      this.songsService.getSongs()
        .subscribe(songs=> this.songs = songs);
  }

  
}
