import { Component, EventEmitter, Output, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ContentBlockEntry } from '../../models/link-page.models';

/** Form used inside the "Add Block" dialog. */
@Component({
  selector: 'app-content-block-form',
  imports: [ReactiveFormsModule],
  templateUrl: './content-block-form.component.html',
  styleUrl: './content-block-form.component.css',
})
export class ContentBlockFormComponent {
  private readonly formBuilder = inject(FormBuilder);

  @Output() saved = new EventEmitter<ContentBlockEntry>();
  @Output() cancelled = new EventEmitter<void>();

  /** Fields needed to create a custom link block on the page. */
  protected readonly form = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required, Validators.maxLength(60)]],
    url: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
    description: ['', Validators.maxLength(140)],
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saved.emit(this.form.getRawValue());
    this.form.reset({ title: '', url: '', description: '' });
  }

  protected cancel(): void {
    this.cancelled.emit();
  }

  protected showError(controlName: 'title' | 'url'): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && control.touched;
  }
}
