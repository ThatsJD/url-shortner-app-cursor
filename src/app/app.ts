import { Component, signal } from '@angular/core';
import { SlideDialogComponent } from './components/slide-dialog/slide-dialog.component';
import { MessengerFormComponent } from './components/messenger-form/messenger-form.component';
import { ContentBlockFormComponent } from './components/content-block-form/content-block-form.component';
import { SocialLinkFormComponent } from './components/social-link-form/social-link-form.component';
import {
  ActionBlockConfig,
  BlockType,
  ContentBlockEntry,
  MessengerEntry,
  SlideDirection,
  SocialLinkEntry,
} from './models/link-page.models';

/**
 * Root page component for the single-page link-in-bio experience.
 * It renders the profile header, action blocks, and the slide dialog
 * that opens when a block is clicked.
 */
@Component({
  selector: 'app-root',
  imports: [
    SlideDialogComponent,
    MessengerFormComponent,
    ContentBlockFormComponent,
    SocialLinkFormComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  /** Public page title shown under the avatar placeholder. */
  protected readonly pageTitle = signal('Title here');

  /**
   * Default slide direction for dialogs.
   * Change this value to 'top', 'left', or 'right' to alter the animation.
   */
  protected readonly dialogDirection = signal<SlideDirection>('bottom');

  /** Whether the slide dialog is currently visible. */
  protected readonly isDialogOpen = signal(false);

  /** Tracks which block type is being edited inside the dialog. */
  protected readonly activeBlock = signal<BlockType | null>(null);

  /** Saved entries shown below the action blocks after successful submit. */
  protected readonly savedMessengers = signal<MessengerEntry[]>([]);
  protected readonly savedBlocks = signal<ContentBlockEntry[]>([]);
  protected readonly savedSocialLinks = signal<SocialLinkEntry[]>([]);

  /** Configuration for the three primary action blocks from the wireframe. */
  protected readonly actionBlocks: ActionBlockConfig[] = [
    {
      id: 'messengers',
      label: 'Add Messengers',
      dialogTitle: 'Add a messenger',
      dialogDescription: 'Connect WhatsApp, Telegram, or another chat app.',
    },
    {
      id: 'content-block',
      label: 'Add Block',
      dialogTitle: 'Add a custom block',
      dialogDescription: 'Create a button that links anywhere on the web.',
    },
    {
      id: 'social-links',
      label: 'Add Social Links',
      dialogTitle: 'Add a social profile',
      dialogDescription: 'Link your Instagram, X, or other social accounts.',
    },
  ];

  /** Opens the dialog for the clicked block type. */
  protected openBlockDialog(blockType: BlockType): void {
    this.activeBlock.set(blockType);
    this.isDialogOpen.set(true);
  }

  /** Closes the dialog and clears the active block selection. */
  protected closeDialog(): void {
    this.isDialogOpen.set(false);
    this.activeBlock.set(null);
  }

  /** Returns metadata for the currently selected block. */
  protected activeBlockConfig(): ActionBlockConfig | undefined {
    return this.actionBlocks.find((block) => block.id === this.activeBlock());
  }

  /** Persist a messenger entry and close the dialog. */
  protected onMessengerSaved(entry: MessengerEntry): void {
    this.savedMessengers.update((items) => [...items, entry]);
    this.closeDialog();
  }

  /** Persist a custom content block and close the dialog. */
  protected onContentBlockSaved(entry: ContentBlockEntry): void {
    this.savedBlocks.update((items) => [...items, entry]);
    this.closeDialog();
  }

  /** Persist a social link and close the dialog. */
  protected onSocialLinkSaved(entry: SocialLinkEntry): void {
    this.savedSocialLinks.update((items) => [...items, entry]);
    this.closeDialog();
  }

  /**
   * Demo helper: cycles dialog direction so you can preview every option.
   * Remove or replace this in production if direction should stay fixed.
   */
  protected cycleDialogDirection(): void {
    const order: SlideDirection[] = ['bottom', 'top', 'left', 'right'];
    const currentIndex = order.indexOf(this.dialogDirection());
    const nextIndex = (currentIndex + 1) % order.length;
    this.dialogDirection.set(order[nextIndex]);
  }
}
