import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';

import { AppComponent } from './app.component';
import { reducers, metaReducers } from './reducers';
import { CommentStoreModule } from './store';
import { PipesModule } from './pipes/pipes.module';
import { DirectivesModule } from './directives/directives.module';

import { CommentCardComponent } from './comment-card/comment-card.component';
import { CommentsListComponent } from './comments-list/comments-list.component';
import { CommentCardEditComponent } from './comment-card-edit/comment-card-edit.component';
import { CommentFilterComponent } from './comment-filter/comment-filter.component';

const materialModules = [
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatFormFieldModule,
  MatIconModule,
  MatToolbarModule,
  MatInputModule
];

@NgModule({
  declarations: [
    AppComponent,
    CommentCardComponent,
    CommentsListComponent,
    CommentCardEditComponent,
    CommentFilterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    EffectsModule.forRoot([]),
    CommentStoreModule,
    ...materialModules,
    PipesModule,
    DirectivesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
