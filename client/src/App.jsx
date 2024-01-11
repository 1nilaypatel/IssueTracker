import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Appbar from './components/Appbar';
import {Home, Profile, SignIn, SignUp} from './pages';

export default function App() {
  return (
    <div>
      <Router>
        <Appbar/>
        <Routes>
          <Route path={"/"} element={<Home/>} />
          <Route path={"/sign-in"} element={<SignIn/>} />
          <Route path={"/sign-up"} element={<SignUp/>} /> 
          <Route path={"/profile"} element={<Profile/>} />
        </Routes>
      </Router>
    </div>
  )
}
