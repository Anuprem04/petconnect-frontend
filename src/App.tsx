
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
import { AddPet } from './components/pet/AddPet';
import { PetDetails } from './components/user/PetDetails';
import { UserDashBoard } from './components/user/UserDashBoard';
import { AdoptionStatus } from './components/user/AdoptionStatus';
<<<<<<< HEAD
import { PetsDashBoard } from './components/user/PetsDashBoard';
import { ViewProfile } from './components/view/ViewProfile';
import { ContactUs } from './components/contact/ContactUs';
import AboutUs from './components/about/AboutUs';

=======
import { ManagePetsTable } from './components/shelter/ManagePets';
import { PetsDashBoard } from './components/user/PetsDashBoard';
import { ShelterPetCard } from './components/shelter/ShelterPetCard';
>>>>>>> 123ae177dc3eb7cb2c0a58d210bf2b09ea6d6a28

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
        <Route path="/pets" element={<PetsDashBoard />} />
        <Route path="/add/pet" element={<AddPet />} />
        <Route path="/pet/:petId" element={<PetDetails />} />
        <Route path="/shelter/pets/card/:petId" element={<ShelterPetCard />} />
        <Route path="/user/dashboard" element={<UserDashBoard />} />
        <Route path="/user/adoptions" element={<AdoptionStatus />} />
<<<<<<< HEAD
        <Route path="/view/profile" element={<ViewProfile />} />
        <Route path="/contact/contactus" element={<ContactUs />} />
        <Route path="/about/aboutUs" element={<AboutUs />} />
=======
        <Route path="/manage/pets" element={<ManagePetsTable />} />
>>>>>>> 123ae177dc3eb7cb2c0a58d210bf2b09ea6d6a28
      </Routes>
    </Router>
  );
}

export default App
