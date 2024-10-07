import { Component, Input, OnInit } from '@angular/core';
import { Song } from '../../interfaces/songs.interface';

@Component({
  selector: 'songs-card-song',
  templateUrl: './card-song.component.html',

})
export class CardSongComponent implements OnInit{
    @Input() public song!:Song;

    ngOnInit(): void {
        if(!this.song){
             throw Error('Song property is required');
        }
    }
}
