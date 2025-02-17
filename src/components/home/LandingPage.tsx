import { Header } from '../header/Header';



const mainLinks = [
  { link: '#', label: 'Login/Sign Up' },
  { link: '#', label: 'Shelter Services' }
];

export function LandingPage() {
 return (<Header mainLinks={mainLinks}/>)
}