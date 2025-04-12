
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
import { ContactUs } from './components/contact/ContactUs';
import AboutUs from './components/about/AboutUs';
import { ManagePetsTable } from './components/shelter/ManagePets';
import { PetsDashBoard } from './components/user/PetsDashBoard';
import { ManageAdoptionsTable } from './components/shelter/ManageAdoptions';

import PrivacyPolicy from './components/privacy/PrivacyPolicy';
import BlogPage from './components/blog/Blog';
import StorePage from './components/store/Store';
import CareerPage from './components/career/Career';
import PostQueryPage from './components/user/PostQueryPage';
import ViewInquiriesPage from './components/shelter/ViewInquiryPage';
import CourierService from './components/courier/CourierServce';
import Tracker from './components/track/TrackCourier';


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
        <Route path="/user/dashboard" element={<UserDashBoard />} />
        <Route path="/user/adoptions" element={<AdoptionStatus />} />
        <Route path="/contact/contactus" element={<ContactUs />} />
        <Route path="/about/aboutus" element={<AboutUs />} />
        <Route path="/manage/pets" element={<ManagePetsTable />} />
        <Route path="/privacy/policy" element={<PrivacyPolicy />} />
        <Route path="/blog/blog" element={<BlogPage />} />
        <Route path="/store/store" element={<StorePage />} />
        <Route path="/career/career" element={<CareerPage />} />
        <Route path="/user/post" element={<PostQueryPage />} />
        <Route path="/shelter/viewinquiry" element={<ViewInquiriesPage />} />
        <Route path="/manage/adoptions" element={<ManageAdoptionsTable />} />
        <Route path="/courier/courier" element={<CourierService />} />
        <Route path="/track/track" element={<Tracker />} />
      </Routes>
    </Router>
  );
}

export default App
