import { Component, EventEmitter, Output, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SocialLinkEntry } from '../../models/link-page.models';

/** Form used inside the "Add Social Links" dialog. */
@Component({
  selector: 'app-social-link-form',
  imports: [ReactiveFormsModule],
  templateUrl: './social-link-form.component.html',
  styleUrl: './social-link-form.component.css',
})
export class SocialLinkFormComponent {
  private readonly formBuilder = inject(FormBuilder);

  @Output() saved = new EventEmitter<SocialLinkEntry>();
  @Output() cancelled = new EventEmitter<void>();

  /** Popular social networks available in the dropdown. */
  protected readonly platforms = [
    'Instagram',
    'X (Twitter)',
    'Facebook',
    'LinkedIn',
    'YouTube',
    'TikTok',
    'GitHub',
  ];

  protected readonly form = this.formBuilder.nonNullable.group({
    platform: ['Instagram', Validators.required],
    profileUrl: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
    username: ['', [Validators.required, Validators.maxLength(30)]],
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saved.emit(this.form.getRawValue());
    this.form.reset({
      platform: 'Instagram',
      profileUrl: '',
      username: '',
    });
  }

  protected cancel(): void {
    this.cancelled.emit();
  }

  protected showError(controlName: 'profileUrl' | 'username'): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && control.touched;
  }
}
