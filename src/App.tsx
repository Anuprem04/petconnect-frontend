
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
import { Login } from './components/login/Login';
import { ForgotPassword } from './components/forgotPassword/ForgotPassword';
import { Register } from './components/register/RegisterUser';
import { Shelter } from './components/shelter/Shelter';
import { RegisterShelter } from './components/register/RegisterShelter';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />}/>
        <Route path="/shelter" element={<Shelter />} />
        <Route path="/registerShelter" element={<RegisterShelter />} />
      </Routes>
    </Router>
  );
}

export default App
