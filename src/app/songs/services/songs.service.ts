import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Song } from '../interfaces/songs.interface';
import { environment } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class SongsService {

  private baseUrl:string = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  getSongs():Observable<Song[]>{
    return this.httpClient.get<Song[]>(`${this.baseUrl}/topSongs`);
  }

  getHeroById(id:string):Observable<Song | undefined>{
    console.log(typeof id);
    return this.httpClient.get<Song[]>(`${this.baseUrl}/topSongs/?id=${ id }`)
      .pipe(
        map(songs => songs[0]),
            catchError(error => {
                console.error('Error al obtener la canción:', error);
                return of(undefined);
            })
      );
  }

  getSuggestion(query:string): Observable<Song[]>{
      return this.httpClient.get<Song[]>(`${this.baseUrl}/topSongs?q=${query}&_limit=6`);
  }


  addSong(song: Song): Observable<Song> {
    return this.httpClient.post<Song>(`${this.baseUrl}/topSongs`, song);
  }

  updateSong(song: Song): Observable<Song> {
    if(!song.id) throw Error('Song id is required');
    return this.httpClient.patch<Song>(`${this.baseUrl}/topSongs/${song.id}`, song);
  }

  deleteSongById(id: number): Observable<boolean> {

    return this.httpClient.delete(`${this.baseUrl}/topSongs/${ id}`)
      .pipe(
        catchError(err => of(false)),
        map(response => true),
      );

  }
}
