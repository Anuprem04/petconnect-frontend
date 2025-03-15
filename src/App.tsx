
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
import { Shelter } from './components/login/ShelterLogin';
import { RegisterShelter } from './components/register/RegisterShelter';
import { RegisterUser } from './components/register/RegisterUser';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/forgot-password" element={<ForgotPassword />}/>
        <Route path="/shelter" element={<Shelter />} />
        <Route path="/registerShelter" element={<RegisterShelter />} />
      </Routes>
    </Router>
  );
}

export default App
