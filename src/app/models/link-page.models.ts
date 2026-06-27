/** Supported slide directions for the bottom-sheet style dialog. */
export type SlideDirection = 'bottom' | 'top' | 'left' | 'right';

/** Each clickable block on the link page maps to one of these types. */
export type BlockType = 'messengers' | 'content-block' | 'social-links';

/** Metadata shown on each action block button in the main page. */
export interface ActionBlockConfig {
  id: BlockType;
  label: string;
  dialogTitle: string;
  dialogDescription: string;
}

/** User-submitted messenger connection details. */
export interface MessengerEntry {
  platform: string;
  contactValue: string;
  displayLabel: string;
}

/** User-submitted custom content block details. */
export interface ContentBlockEntry {
  title: string;
  url: string;
  description: string;
}

/** User-submitted social profile link details. */
export interface SocialLinkEntry {
  platform: string;
  profileUrl: string;
  username: string;
}
