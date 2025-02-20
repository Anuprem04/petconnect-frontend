import { Footer } from '../footer/Footer';
import { Header } from '../header/Header';
import { Quote } from '../quote/Quote';
import { PetCarousel } from './PetCarousel';
import { Link } from 'react-router-dom';


const mainLinks = [
  { link: '/login', label: 'Login/Sign Up' },
  { link: '/shelter', label: 'Shelter Services' }
];

export function LandingPage() {
 return (<><Header
  mainLinks={mainLinks.map((item) => ({
    ...item,
    link: (
      <Link
        to={item.link}
        style={{
          textDecoration: 'none',
          color: 'inherit',
        }}
      >
        {item.label}
      </Link>
    ),
}))}/><PetCarousel/><Quote/><Footer/></>)
}