import { Pipe, PipeTransform } from '@angular/core';
import { Song } from '../interfaces/songs.interface';

@Pipe({
  name: 'songImage'
})
export class SongImagePipe implements PipeTransform {

  transform(song: Song): string {
    if( song.id <= 0  && !song.alt_img){
      return 'assets/no-image.jpg'
    }

    if(song.alt_img){
      return song.alt_img;
    }
    return `assets/songs/${song.id}.jpg`
  }

}
