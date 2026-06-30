import { Component, EventEmitter, Output, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessengerEntry } from '../../models/link-page.models';

/** Form used inside the "Add Messengers" dialog. */
@Component({
  selector: 'app-messenger-form',
  imports: [ReactiveFormsModule],
  templateUrl: './messenger-form.component.html',
  styleUrl: './messenger-form.component.css',
})
export class MessengerFormComponent {
  private readonly formBuilder = inject(FormBuilder);

  /** Emits validated messenger data back to the parent page. */
  @Output() saved = new EventEmitter<MessengerEntry>();

  /** Emits when the user cancels editing. */
  @Output() cancelled = new EventEmitter<void>();

  /** Supported messenger platforms shown in the select input. */
  protected readonly platforms = [
    'WhatsApp',
    'Telegram',
    'Facebook Messenger',
    'Viber',
    'Signal',
    'WeChat',
  ];

  /** Reactive form definition with the fields required for a messenger link. */
  protected readonly form = this.formBuilder.nonNullable.group({
    platform: ['WhatsApp', Validators.required],
    contactValue: ['', [Validators.required, Validators.minLength(3)]],
    displayLabel: ['', [Validators.required, Validators.maxLength(40)]],
  });

  /** Submit only when every control is valid. */
  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saved.emit(this.form.getRawValue());
    this.form.reset({
      platform: 'WhatsApp',
      contactValue: '',
      displayLabel: '',
    });
  }

  /** Bubble cancel action up to close the dialog. */
  protected cancel(): void {
    this.cancelled.emit();
  }

  /** Helper for showing validation messages in the template. */
  protected showError(controlName: 'contactValue' | 'displayLabel'): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && control.touched;
  }
}
