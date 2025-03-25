import { Footer } from '../footer/Footer';
import { Header, MainLink } from '../header/Header';
import { Quote } from '../quote/Quote';
import { PetCarousel } from './PetCarousel';
import { Link } from 'react-router-dom';
import classes from './LandingPage.module.css';

// Define main links with navigation target and label
const mainLinks: MainLink[] = [
  { link: '/home', label: 'Home' },
  { link: '/login/user', label: 'Login/Sign Up' },
  { link: '/login/shelter', label: 'Shelter Services' }
];

const transformedMainLinks: MainLink[] = mainLinks.map((item) => ({
  ...item,
  display: (
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
}));

export function LandingPage() {
  return (
    <div className={classes.bg}>
      <Header mainLinks={transformedMainLinks} />
      <PetCarousel />
      <Quote text= {'Saving one animal won’t change the world, but for that one animal, the world will change forever.'} />
      <Footer />
    </div>
  );
}
