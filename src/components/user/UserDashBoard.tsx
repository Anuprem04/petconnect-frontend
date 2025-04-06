import { Link, Navigate } from 'react-router-dom';
import { Footer } from '../footer/Footer';
import { Header, MainLink } from '../header/Header';
import { UserCards } from './UserCards';
import classes from './UserDashBoard.module.css';
import { useAuth } from '../security/useAuth';

export function UserDashBoard() {
  const auth = useAuth();
  if (!auth) return <Navigate to="/login/user" replace />;
  if (auth.role !== 'USER') return <Navigate to="/login/user" replace />;

  const mainLinks: MainLink[] = [
    { link: '/home', label: 'Home' },
    { link: '/view/profile', label: 'View Profile' },
  ];

  const transformedMainLinks: MainLink[] = mainLinks.map((item) => ({
    ...item,
    display: (
      <Link to={item.link} style={{ textDecoration: 'none', color: 'inherit' }}>
        {item.label}
      </Link>
    ),
  }));

  return (
    <div className={classes.bg}>
      <Header mainLinks={transformedMainLinks} />
       <UserCards></UserCards>
      <Footer style={{marginTop : '8%'}} />
    </div>
  );
}


