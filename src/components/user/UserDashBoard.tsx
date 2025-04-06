import { Link, Navigate } from 'react-router-dom';
import { Footer } from '../footer/Footer';
import { Header, MainLink } from '../header/Header';
import { UserCards } from './UserCards';
import classes from './UserDashBoard.module.css';
import { useAuth } from '../security/useAuth';
import { ViewProfileModal } from '../view/ViewProfile';
import { useState } from 'react';

export function UserDashBoard() {
  const [profileModalOpened, setProfileModalOpened] = useState(false);
  const auth = useAuth();
  if (!auth) return <Navigate to="/login/user" replace />;
  if (auth.role !== 'USER') return <Navigate to="/login/user" replace />;

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
    <div className={classes.bg}>
      <Header
        mainLinks={transformedMainLinks}
        onProfileClick={() => setProfileModalOpened(true)}
      />
      <UserCards></UserCards>
      <Footer style={{ marginTop: '8%' }} />
      <ViewProfileModal
        opened={profileModalOpened}
        onClose={() => setProfileModalOpened(false)}
      />
    </div>
  );
}


