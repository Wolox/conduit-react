import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface ItemsMenu {
  text: string;
  href: string;
  isProtected: boolean;
  icon: IconDefinition;
}
