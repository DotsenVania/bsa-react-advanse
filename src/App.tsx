import "./App.scss";
import './assets/css/style.scss';
import { Route, Routes} from "react-router-dom";
import Main from "./components/main/main";
import Header from "./components/header/header";
import TripId from "./components/trip/tripId/tripId";
import Bookings from "./components/bookings/bookings";
import Footer from "./components/footer/footer";
import SignIn from "./components/sign-in/sign-in";
import SignUp from "./components/sign-up/sign-up";
import useTokenVerification from "./tokenVerification";

function App() {
  useTokenVerification();
  return (
    <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/trip/:idTrip" element={<TripId />} />
          <Route path="/bookings" element={<Bookings/>} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="*" element={<Main />} />
        </Routes>
        <Footer/>
    </div>
  );
}

export default App;