
import { Navigate } from 'react-router-dom';
import { Footer } from '../footer/Footer';
import { Header, MainLink } from '../header/Header';
import { Quote } from '../quote/Quote';
import { Link } from 'react-router-dom';
import classes from '../home/LandingPage.module.css';
import { ShelterCards } from './ShelterCards';
import { useAuth } from '../security/useAuth';


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

export function ShelterDashboard() {
  // Get the token from localStorage
  // Use our custom auth hook
  const auth = useAuth();
  
  if (!auth) return <Navigate to="/login/shelter" replace />;
  if (auth.role !== 'SHELTER') return <Navigate to="/login/shelter" replace />;
  
  // Now auth.shelterId is available from the token


  // If all checks pass, render the dashboard
  return (
    <div className={classes.bg}>
      <Header mainLinks={transformedMainLinks} />
      <ShelterCards></ShelterCards>
      <Quote text= {'Every shelter is a beacon of hope – a safe haven where compassion transforms lives.'} />
      <Footer />
    </div>
  );
}
