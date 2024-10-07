import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewSongPageComponent } from './pages/new-song-page/new-song-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import {  SongPageComponent } from './pages/song-page/song-page.component';

//localhost:4200/heroes/
const routes: Routes = [

  //localhost:4200/heroes/
  {
  path: '',
  component: LayoutPageComponent,
  children:[
    {path: 'new-song', component: NewSongPageComponent},
    {path: 'search', component: SearchPageComponent},
    {path: 'edit/:id', component: NewSongPageComponent},
    {path: 'list', component: ListPageComponent},
    {path: ':id', component: SongPageComponent},
    {path: '**', redirectTo:'list'},
  ]
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SongsRoutingModule { }
