import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SongsRoutingModule } from './songs-routing.module';
import { SongPageComponent } from './pages/song-page/song-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewSongPageComponent } from './pages/new-song-page/new-song-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { MaterialModule } from '../material/material.module';
import { CardSongComponent } from './components/card-song/card-song.component';
import { SongImagePipe } from './pipes/song-image.pipe';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    SongPageComponent,
    LayoutPageComponent,
    ListPageComponent,
    NewSongPageComponent,
    SearchPageComponent,
    CardSongComponent,
    SongImagePipe,
  ],
  imports: [
    CommonModule,
    SongsRoutingModule,
    MaterialModule,
    RouterModule,
  ],
  exports:[
    CardSongComponent,
  ]
})
export class SongsModule { }
