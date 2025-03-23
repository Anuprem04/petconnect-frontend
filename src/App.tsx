
import './App.css'
// core styles are required for all packages
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';

// other css files are required only if
// you are using components from the corresponding package
 import '@mantine/dates/styles.css';
 import '@mantine/dropzone/styles.css';
 import '@mantine/code-highlight/styles.css';
import {LandingPage} from './components/home/LandingPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './components/login/UserLogin';
import { ForgotPassword } from './components/forgotPassword/ForgotPassword';
import {  ShelterLogin } from './components/login/ShelterLogin';
import { RegisterShelter } from './components/register/RegisterShelter';
import { RegisterUser } from './components/register/RegisterUser';
import { ShelterDashboard } from './components/shelter/ShelterDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<LandingPage />} />
        <Route path="/login/user" element={<Login />} />
        <Route path="/register/user" element={<RegisterUser />} />
        <Route path="/forgot-password" element={<ForgotPassword />}/>
        <Route path="/login/shelter" element={<ShelterLogin />} />
        <Route path="/register/shelter" element={<RegisterShelter />} />
        <Route path="/shelter/dashboard" element={<ShelterDashboard />} />
      </Routes>
    </Router>
  );
}

export default App
