import { Footer } from '../footer/Footer';
import { Header } from '../header/Header';
import { PetCarousel } from './PetCarousel';



const mainLinks = [
  { link: '#', label: 'Login/Sign Up' },
  { link: '#', label: 'Shelter Services' }
];

export function LandingPage() {
 return (<><Header mainLinks={mainLinks}/><PetCarousel/><Footer/></>)
}