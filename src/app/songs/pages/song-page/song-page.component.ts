import { Component, OnInit } from '@angular/core';
import { SongsService } from '../../services/songs.service';
import { ActivatedRoute,  Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Song } from '../../interfaces/songs.interface';

@Component({
  selector: 'song-page',
  templateUrl: './song-page.component.html',
  styles: ``
})
export class SongPageComponent implements OnInit {

    public song?: Song;
    constructor(private songsService: SongsService,
      private activatedRoute: ActivatedRoute,
      private router: Router
    ){}

    ngOnInit(): void {
        this.activatedRoute.params
        .pipe(
          switchMap( ({id}) => this.songsService.getHeroById(id)),
        ).subscribe(song =>{
          if (!song) {
            console.error('Canción no encontrada, redirigiendo...');
            return this.router.navigate(['/songs/list']);
        }
            this.song = song;
            return;
        })
    }

    goBack():void{
      this.router.navigate(['/songs/list']);
    }

    goToYoutubeMusic(){
      //!TODO: mandar a Youtube con el song.title
      const title = this.song?.title;
      if (title) {
        const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(title)}`;
        window.open(youtubeSearchUrl, '_blank'); // Abre la búsqueda de YouTube en una nueva pestaña
      }
    }
}
