import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete,
} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

import { Observable } from 'rxjs';
import { map, startWith, withLatestFrom } from 'rxjs/operators';

import { Comment } from 'src/app/core/models';
import { CommentFacade } from '../store/comment';

@Component({
  selector: 'app-comment-card-edit',
  templateUrl: './comment-card-edit.component.html',
  styleUrls: ['./comment-card-edit.component.scss'],
})
export class CommentCardEditComponent implements OnInit {
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @Input() data: Comment;
  form: FormGroup;
  tagCtrl = this.fb.control([]);
  filteredTags: Observable<string[]>;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private readonly fb: FormBuilder,
    private readonly commentFacade: CommentFacade
  ) {}

  ngOnInit(): void {
    if (!!this.data) {
      this.form = this.fb.group({
        id: [this.data.id],
        title: [this.data.title, [Validators.required]],
        tags: [this.data.tags],
        text: [this.data.text, [Validators.required]],
      });
    } else {
      this.form = this.fb.group({
        id: [null],
        title: [null, [Validators.required]],
        tags: [[]],
        text: [null, [Validators.required]],
      });
    }
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      withLatestFrom(this.commentFacade.tags$),
      map(([tag, allTags]) => {
        if (tag === null) {
          return [...allTags];
        }
        const value = tag.toLowerCase();
        return allTags.filter((t) => t.toLowerCase().includes(value));
      })
    );
  }

  submit(event, commentForm): void {
    event.preventDefault();
    if (!!this.form.value.id) {
      this.commentFacade.edit(this.form.value);
    } else {
      this.commentFacade.add(this.form.value);
    }
    this.form.reset();
    commentForm.resetForm();
  }

  cancel(): void {
    this.commentFacade.toggleEdit(undefined);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const tags = [...this.form.value.tags];
    this.form.get('tags').setValue([...tags, event.option.viewValue]);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      const tags = [...this.form.value.tags];
      this.form.get('tags').setValue([...tags, value.trim()]);
    }

    if (input) {
      input.value = '';
    }

    this.tagCtrl.setValue(null);
  }

  removeTag(tag: string): void {
    const tags = [...this.form.value.tags];

    this.form.get('tags').setValue([...tags.filter((t) => t !== tag)]);
  }
}
