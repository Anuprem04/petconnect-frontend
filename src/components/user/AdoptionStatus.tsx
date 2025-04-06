import { Link, Navigate } from 'react-router-dom';
import { Footer } from '../footer/Footer';
import { Header, MainLink } from '../header/Header';
import { useAuth } from '../security/useAuth';
import { AdoptionRequestTable } from './AdoptionRequestTable';
import classes from './AdoptionStatus.module.css';

export function AdoptionStatus() {
  const auth = useAuth();

  if (!auth || auth.role !== 'USER') {
    return <Navigate to="/login/user" replace />;
  }

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
    <div className={classes.container}>
      <Header mainLinks={transformedMainLinks} />
      <div className={classes.content}>
        <AdoptionRequestTable />
      </div>
      <Footer />
    </div>
  );
}
