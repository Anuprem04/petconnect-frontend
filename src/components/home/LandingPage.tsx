import { Footer } from '../footer/Footer';
import { Header } from '../header/Header';
import { Quote } from '../quote/Quote';
import { PetCarousel } from './PetCarousel';
import { Link } from 'react-router-dom';


const mainLinks = [
  { link: '/login', label: 'Login/Sign Up' },
  { link: '#', label: 'Shelter Services' }
];

export function LandingPage() {
 return (<><Header mainLinks={mainLinks.map((item) => ({
  ...item,
  link: item.link === '/login' ? <Link to="/login">{item.label}</Link> : item.link,
}))}/><PetCarousel/><Quote/><Footer/></>)
}