import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Language, Song } from '../../interfaces/songs.interface';
import { SongsService } from '../../services/songs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'song-new-song-page',
  templateUrl: './new-song-page.component.html',
  styles: ``
})
export class NewSongPageComponent implements OnInit{


  public languages = [
    {id: "Spanish", value: 'Spanish'},
    {id: "English", value: 'English'},
    {id: "French", value: 'French'},
    {id: "Portuguese", value: 'Portuguese'},
    {id: "Italian", value: 'Italian'},
  ];

    public songForm = new FormGroup({
      id:      new FormControl<number>(0),
      title:   new FormControl<string>('', {nonNullable: true}),
      artist:  new FormControl<string>('', {nonNullable: true}),
      year:    new FormControl<number>(0),
      genre:   new FormControl<string>('', {nonNullable: true}),
      duration: new FormControl<string>( { value :'' , disabled: true}),
      duration_seconds: new FormControl<number>(0, {nonNullable: true}),
      album:  new FormControl<string>(''),
      plays:  new FormControl<number>(0),
      language: new FormControl<Language>(Language.English),
      alt_img: new FormControl<string>(''),
    });

    constructor(private songsService :SongsService,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private snackBar: MatSnackBar,
      private dialog: MatDialog,
    ){}


     get currentSong() : Song {
      const song = this.songForm.value as Song;
     const durationSeconds = this.songForm.get('duration_seconds')?.value;
     const formattedDuration = durationSeconds ? `${Math.floor(durationSeconds / 60)}:${durationSeconds % 60 < 10 ? '0' : ''}${durationSeconds % 60}`: '';

      return {
          ...song,
          duration: formattedDuration,
      };
    }

    ngOnInit(): void {

      if(!this.router.url.includes('edit')) return;

      this.activatedRoute.params
        .pipe(
          switchMap(({id})=> this.songsService.getHeroById(id)),
        ).subscribe(song => {
          if(!song){
            return this.router.navigateByUrl('/');
          }
          this.songForm.reset( song )
          return;
        })

      this.songForm.get('duration_seconds')?.valueChanges
        .subscribe(value => {
          const formattedDuration = value ? `${Math.floor(value / 60)}:${value % 60 < 10 ? '0' : ''}${value % 60}` : '';
          this.songForm.get('duration')?.setValue(formattedDuration);
        });


    }

    onDeleteSong(){
        if(!this.currentSong.id) throw new Error('id required');

        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          data: this.songForm.value
        });

        dialogRef.afterClosed().subscribe(result =>{
            if(!result) return;
            this.songsService.deleteSongById(this.currentSong.id)
            .subscribe(wasDeleted => {
              if(wasDeleted)
                this.router.navigate(['/songs/list'])
            })
          });
    }


    showSnackBar(message: string ):void {
       this.snackBar.open( message, 'done', {
          duration:2500,
       })
    }

    onSubmit():void{
      console.log({
        formIsValid: this.songForm.valid,
        value: this.songForm.getRawValue(),
      })

      if(this.songForm.invalid) return;

      if(this.currentSong.id){
        this.songsService.updateSong(this.currentSong)
          .subscribe( song =>{
               //!TODO mostrar snackbar
               this.showSnackBar(`${song.title} has been updated!`)
          });
          return;
      }

      console.log(this.currentSong);

      this.songsService.addSong( this.currentSong )
        .subscribe(song =>{

          //!TODO: mostrar snackbar creo correctamente y navegar a songs/edit /song.id

          this.showSnackBar(`${song.title} has been created!`);

          this.router.navigate(['/songs/edit', song.id])

        })
    }

}
