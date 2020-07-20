import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule, RouterState } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { reducers, metaReducers } from './reducers';
import { CommentStoreModule, RouteSerializer } from './store';
import { RouteEffects } from './store/route/route.effects';
import { PipesModule } from './pipes/pipes.module';
import { DirectivesModule } from './directives/directives.module';

import { CommentCardComponent } from './comment-card/comment-card.component';
import { CommentsListComponent } from './comments-list/comments-list.component';
import { CommentCardEditComponent } from './comment-card-edit/comment-card-edit.component';
import { CommentFilterComponent } from './comment-filter/comment-filter.component';
import { CommentsViewComponent } from './comments-view/comments-view.component';


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
    CommentFilterComponent,
    CommentsViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    StoreRouterConnectingModule.forRoot({
      serializer: RouteSerializer,
      routerState: RouterState.Full,
    }),
    EffectsModule.forRoot([
      RouteEffects
    ]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    CommentStoreModule,
    ...materialModules,
    PipesModule,
    DirectivesModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
