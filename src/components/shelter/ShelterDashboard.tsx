import { Navigate } from 'react-router-dom';
import { Footer } from '../footer/Footer';
import { Header, MainLink } from '../header/Header';
import { Quote } from '../quote/Quote';
import { Link } from 'react-router-dom';
import classes from '../home/LandingPage.module.css';
import { ShelterCards } from './ShelterCards';
import { useAuth } from '../security/useAuth';
import { useState } from 'react';
import { ViewProfileModal } from '../view/ViewProfile';

const mainLinks: MainLink[] = [
  { link: '/home', label: 'PetConnect Home' },
  { link: '/shelter/dashboard', label: 'Shelter Home' },
  { link: '/view/profile', label: 'View Profile' },
];

// Update transformation so that /view/profile is not wrapped in a Link:
const transformedMainLinks: MainLink[] = mainLinks.map((item) => ({
  ...item,
  display:
    item.link === '/view/profile' ? (
      item.label
    ) : (
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
  const [profileModalOpened, setProfileModalOpened] = useState(false);
  const auth = useAuth();

  if (!auth) return <Navigate to="/login/shelter" replace />;
  if (auth.role !== 'SHELTER') return <Navigate to="/login/shelter" replace />;

  return (
    <div className={classes.bg}>
      <Header 
        mainLinks={transformedMainLinks}  
        onProfileClick={() => setProfileModalOpened(true)}
      />
      <ShelterCards />
      <Quote text={'Every shelter is a beacon of hope – a safe haven where compassion transforms lives.'} />
      <ViewProfileModal 
        opened={profileModalOpened} 
        onClose={() => setProfileModalOpened(false)}
      />
      <Footer />
    </div>
  );
}
