
import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { Footer } from '../footer/Footer';
import { Header, MainLink } from '../header/Header';
import { Quote } from '../quote/Quote';
import { Link } from 'react-router-dom';
import classes from '../home/LandingPage.module.css';
import { ShelterCards } from './ShelterCards';

// Define an interface for the JWT payload (include role, add more fields as needed)
interface JwtPayload {
  role: string;
  // You can add other fields like exp, iat, etc.
}

const mainLinks: MainLink[] = [
  { link: '/manage/pets', label: 'Manage Pets' },
  { link: '/manage/accessories', label: 'Manage Accessories' }
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
  const token = localStorage.getItem('token');

  // If no token exists, redirect to login
  if (!token) {
    return <Navigate to="/login/shelter" replace />;
  }

  // Try to decode the token and check the role
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (decoded.role !== 'SHELTER') {
      // If the role is not "SHELTER", redirect to login
      return <Navigate to="/login/shelter" replace />;
    }
  } catch (error) {
    // If token is invalid, redirect to login
    return <Navigate to="/login/shelter" replace />;
  }

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
