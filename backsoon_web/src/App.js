import Chat from './Components/Chat';
import ErrorPage from './Components/ErrorPage';
import Footer from './Components/Footer';
import HomeRooms from './Components/HomeRooms';
import ListRooms from './Components/ListRoomsComponent/ListRooms';
import ListRooms2 from './Components/ListRoomsComponent/ListRooms2';
import ListRooms3 from './Components/ListRoomsComponent/ListRooms3';
import Login from './Components/Login';
import MainMenu from './Components/MainMenu';
import MyListing from './Components/MyListing';
import NavbarMenu from './Components/NavbarMenu';
import OtpComponent from './Components/OtpComponent';
import Slider from './Components/Slider';
import {Route, Routes } from "react-router-dom"
import Wishlist from './Components/Wishlist';
import AboutBacksoon from './Components/AboutBacksoon';
import MoreDetails from './Components/MoreDetails';
import SearchRooms from './Components/SearchRooms';
import Support from './Components/Support';
import TermsConditionss from './Components/Terms&Conditionss';
import Faq from './Components/Faq';


function App() {

 
  return (
   <>

   <Routes>
     <Route path = "/" element = { <MainMenu />}>
     <Route index element = { <HomeRooms />} />
     <Route path="/listrooms" element={<ListRooms />} />
     <Route path = "/login" element = { <Login />} />
     {/* <Route path="/login/otp" element={<OtpComponent />} /> */}
     <Route path="/chat" element={<Chat />} />
     <Route path="/mylisting" element={<MyListing />} />
     <Route path="/wishlist" element={<Wishlist />} />
     <Route path="/roomsdetails" element={<MoreDetails />} />
     <Route path="/rooms_in" element={<SearchRooms />} />
     <Route path="/about_backsoon" element={<AboutBacksoon />} />
     <Route path="/terms_conditions" element={<TermsConditionss />} />
     <Route path="/faq" element={<Faq />} />
     <Route path="/support" element={<Support />} />
     <Route path = "*" element = { <ErrorPage />} />
     </Route>
   </Routes> 
     
     <Footer /> 

   </>
  
  );

}

export default App;
