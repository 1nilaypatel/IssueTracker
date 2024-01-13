import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Appbar, PrivateRoute} from './components';
import {Home, Profile, SignIn, SignUp, Features} from './pages';

export default function App() {
  return (
    <div>
      <Router>
        <Appbar/>
        <Routes>
          <Route path={"/"} element={<Home/>} />
          <Route path={"/sign-in"} element={<SignIn/>} />
          <Route path={"/sign-up"} element={<SignUp/>} /> 
          <Route path={"/features"} element={<Features/>} /> 
          <Route element={<PrivateRoute />}>
            <Route path={"/profile"} element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}
