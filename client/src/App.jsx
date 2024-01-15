import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Appbar, PrivateRoute} from './components';
import {Home, Profile, SignIn, SignUp, Features, Dashboard, Issues} from './pages';

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
            <Route path={"/dashboard"} element={<Dashboard/>} /> 
            <Route path={"/issues"} element={<Issues/>} /> 
            <Route path={"/profile"} element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}
