import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';

import { Observable } from 'rxjs';
import { startWith, withLatestFrom, map } from 'rxjs/operators';
import { untilDestroy } from '../operators';

import { CommentFacade } from '../store/comment';

@Component({
  selector: 'app-comment-filter',
  templateUrl: './comment-filter.component.html',
  styleUrls: ['./comment-filter.component.scss']
})
export class CommentFilterComponent implements OnInit, OnDestroy {
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  allTags$ = this.commentFacade.tags$;
  allFilters$ = this.commentFacade.filters$;
  form = this.fb.group({
    tags: [[]]
  });
  tagCtrl = this.fb.control([]);
  filteredTags: Observable<string[]>;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private readonly fb: FormBuilder,
    private readonly commentFacade: CommentFacade
  ) { }

  ngOnInit(): void {
    this.allFilters$.pipe(
      untilDestroy(this)
    ).subscribe(filters => {
      this.form.setValue({ ...filters });
    });
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null as string[]),
      withLatestFrom(this.allTags$),
      map(([tag, allTags]) => {
        if (tag === null) {
          return [...allTags];
        }
        const value = tag.toLowerCase();
        return allTags.filter(t => t.toLowerCase().includes(value));
      })
    );
  }

  ngOnDestroy(): void {
    // stub for untilDestroy
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
    this.commentFacade.filter({
      ...this.form.value,
      tags: [
        ...this.form.value.tags,
        event.option.viewValue
      ]
    });
  }

  removeTag(tag: string): void {
    this.commentFacade.filter({
      ...this.form.value,
      tags: [
        ...this.form.value.tags.filter(t => t !== tag)
      ]
    });
  }

}
