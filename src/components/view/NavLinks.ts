// navLinks.ts
import { MainLink } from '../header/Header'; // or wherever you define your MainLink type

export const shelterMainLinks: MainLink[] = [
  { link: '/home', label: 'PetConnect Home' },
  { link: '/shelter/dashboard', label: 'Shelter Home' },
  { link: '/view/profile', label: 'View Profile' },
  // any other shelter-specific links...
];

export const userMainLinks: MainLink[] = [
  { link: '/home', label: 'PetConnect Home' },
  { link: '/user/dashboard', label: 'Dashboard' },
  { link: '/view/profile', label: 'View Profile' },
  // any other user-specific links...
];
