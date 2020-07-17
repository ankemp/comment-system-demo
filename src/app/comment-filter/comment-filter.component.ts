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
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      withLatestFrom(this.commentFacade.tags$),
      map(([tag, allTags]) => {
        if (tag === null) {
          return [...allTags];
        }
        const value = tag.toLowerCase()
        return allTags.filter(t => t.toLowerCase().includes(value));
      })
    );

    this.form.valueChanges.pipe(
      untilDestroy(this)
    ).subscribe(formValue => {
      this.commentFacade.filter(formValue)
    });
  }

  ngOnDestroy(): void {
    // stub for untilDestroy
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const tags = [...this.form.value.tags];
    this.form.get('tags').setValue([...tags, event.option.viewValue]);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  removeTag(tag: string): void {
    const tags = [...this.form.value.tags];

    this.form.get('tags').setValue([...tags.filter(t => t !== tag)]);
  }

}
