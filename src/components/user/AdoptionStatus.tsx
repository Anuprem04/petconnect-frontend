import { Link, Navigate } from 'react-router-dom';
import { Footer } from '../footer/Footer';
import { Header, MainLink } from '../header/Header';
import { useAuth } from '../security/useAuth';
import { AdoptionRequestTable } from './AdoptionRequestTable';
import classes from './AdoptionStatus.module.css';
import { ViewProfileModal } from '../view/ViewProfile';
import { useState } from 'react';

export function AdoptionStatus() {
  const [profileModalOpened, setProfileModalOpened] = useState(false);
  const auth = useAuth();

  if (!auth || auth.role !== 'USER') {
    return <Navigate to="/login/user" replace />;
  }
  
  const mainLinks: MainLink[] = [
    { link: '/home', label: 'PetConnect Home' },
    { link: '/user/dashboard', label: 'User Home' },
    { link: '/view/profile', label: 'View Profile' },
  ];

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

  return (
    <div className={classes.container}>
      <Header 
        mainLinks={transformedMainLinks}
        onProfileClick={() => setProfileModalOpened(true)}
      />
      <div className={classes.content}>
        <AdoptionRequestTable />
      </div>
      <Footer />
      <ViewProfileModal
        opened={profileModalOpened}
        onClose={() => setProfileModalOpened(false)}
      />
    </div>
  );
}
