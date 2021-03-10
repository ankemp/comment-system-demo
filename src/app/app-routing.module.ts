import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommentsViewComponent } from './comments-view/comments-view.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'comments' },
  { path: 'comments', component: CommentsViewComponent },
  { path: 'comments/:id', component: CommentsViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
