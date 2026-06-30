import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
  signal,
} from '@angular/core';
import { SlideDirection } from '../../models/link-page.models';

/**
 * Reusable slide-in dialog panel.
 * The entry direction is controlled through the `direction` input so the
 * same component can behave like a bottom sheet or slide from any edge.
 */
@Component({
  selector: 'app-slide-dialog',
  templateUrl: './slide-dialog.component.html',
  styleUrl: './slide-dialog.component.css',
})
export class SlideDialogComponent {
  /** Controls whether the dialog is rendered and animated in. */
  @Input() set open(value: boolean) {
    this.isOpen.set(value);
  }

  /** Title shown at the top of the dialog header. */
  @Input({ required: true }) title = '';

  /** Optional helper text shown below the title. */
  @Input() description = '';

  /**
   * Slide origin for the panel.
   * Defaults to bottom-to-top, matching the wireframe behavior.
   */
  @Input() direction: SlideDirection = 'bottom';

  /** Emits when the user closes the dialog without saving. */
  @Output() closed = new EventEmitter<void>();

  /** Internal open state used to drive CSS animation classes. */
  protected readonly isOpen = signal(false);

  /** Maps the configured direction to a CSS class on the panel. */
  protected directionClass(): string {
    return `panel-from-${this.direction}`;
  }

  /** Aligns the backdrop flex container for the active direction. */
  protected backdropClass(): string {
    return `backdrop-for-${this.direction}`;
  }

  /** Close when the user clicks the dimmed backdrop. */
  protected onBackdropClick(): void {
    this.closed.emit();
  }

  /** Prevent backdrop clicks from bubbling out of the panel. */
  protected onPanelClick(event: MouseEvent): void {
    event.stopPropagation();
  }

  /** Close when the user presses Escape for keyboard accessibility. */
  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    if (this.isOpen()) {
      this.closed.emit();
    }
  }
}
