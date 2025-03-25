
import { Navigate } from 'react-router-dom';
import { Footer } from '../footer/Footer';
import { Header, MainLink } from '../header/Header';
import { Quote } from '../quote/Quote';
import { Link } from 'react-router-dom';
import classes from '../home/LandingPage.module.css';

import { useAuth } from '../security/useAuth';
import { DisplayPets } from './DisplayPets';


const mainLinks: MainLink[] = [
  { link: '/home', label: 'Home' },
  { link: '/view/profile', label: 'View Profile' }
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

export function UserDashBoard() {
  // Get the token from localStorage
  // Use our custom auth hook
  const auth = useAuth();
  
  if (!auth) return <Navigate to="/login/user" replace />;
  if (auth.role !== 'USER') return <Navigate to="/login/user" replace />;
  
  // Now auth.shelterId is available from the token


  // If all checks pass, render the dashboard
  return (
    <div className={classes.bg}>
      <Header mainLinks={transformedMainLinks} />
      <DisplayPets/>
      <Quote text= {'When you adopt a pet, you don’t just save a life — you gain unconditional love.'} />
      <Footer />
    </div>
  );
}
