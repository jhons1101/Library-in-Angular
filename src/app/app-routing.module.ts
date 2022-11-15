import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/book/listBook/listBook.component';
import { ShowComponent } from './components/book/showBook/showBook.component';

const routes: Routes = [
  { path: '', redirectTo: 'book/list', pathMatch: 'full'},
  { path: 'book/list', component: ListComponent},
  { path: 'book/show', component: ShowComponent},
  { path: 'book/edit/:id', component: ShowComponent},
  { path: '**', redirectTo: 'book/list', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
