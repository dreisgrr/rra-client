import { useState, useContext } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom"
import SearchResultList from "./components/searchResultList/SearchResultList";
import Navbar from "./components/navbar/Navbar"
import Login from "./pages/login/Login";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/home/Home";
import ReservationsList from "./pages/reservationsList/ReservationsList";
import ReservationDetails from "./pages/reservationDetails/ReservationDetails";
import AdminTopbar from "./components/admin/topbar/AdminTopbar";
import AdminViewRequests from "./pages/admin/requests/AdminViewRequests";
import NotFound from "./pages/notfound/NotFound";
import AdminSearch from "./pages/admin/adminSearch/AdminSearch";
import AdminSites from "./pages/admin/adminSites/AdminSites";
import RoomList from "./pages/admin/roomList/RoomList";
import UnderConstruction from "./pages/underConstruction/UnderConstruction";
import { urlDefinition } from "./utils/definitions.js"

function App() {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/")
  const url = splitLocation[1];

  const { user } = useContext(AuthContext)
  let index = urlDefinition.findIndex( item => item === url)
  const [activeIndex, setActiveIndex] = useState(index);
  
  const handlePassActive = (i) => {
      setActiveIndex(i)
  }

  return (
    <>
    
    <Navbar passActive={ (i)=> handlePassActive(i)}/>
    {
      user?.permissions?.isAdmin ? 
      <>
        <AdminTopbar passActive={ (i)=> handlePassActive(i)} activeIndexApp={activeIndex}/>
        <Routes>
          <Route path='*' element={user ? <NotFound /> : <Login />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login/>} />
          <Route path="/reservations" element={user ? <AdminViewRequests/> : <Navigate to="/login" /> } />
          <Route path="/reservations/:id" element={user ? <ReservationDetails /> : <Navigate to="/login" />} />
          <Route path="/search" element={user ? <AdminSearch/> : <Navigate to="/login"/>} />
          <Route path="/sites" element={user ? <AdminSites/> : <Navigate to="/login" /> } />
          <Route path="/rooms" element={user ? <RoomList/> : <Navigate to="/login" /> } />
          <Route path="/reports" element={user ? <UnderConstruction/> : <Navigate to="/login" /> } />
          <Route path="/" element={user ? <Navigate to="/reservations" /> : <Navigate to="/login" /> } />
        </Routes>
      </> :
      <>
        <Routes>
          <Route path='*' element={user ? <NotFound /> : <Login />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login/>} />
          <Route path="/" element={user ? <Home/> : <Navigate to="/login"/>} />
          <Route path="/search" element={user ? <SearchResultList/> : <Navigate to="/login"/>} />
          <Route path="/reservations" element={user ? <ReservationsList />: <Navigate to="/login"/>} />
          <Route path="/reservations/:id" element={user ? <ReservationDetails /> : <Navigate to="/login" />} />
        </Routes>
      </>
    }
      
    </>
  );
}

export default App;
