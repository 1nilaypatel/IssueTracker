import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const response = await axios.post("/server/auth/google", {
        name: result.user.displayName,
        email: result.user.email,
        profilephoto: result.user.photoURL,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = response.data;
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log('Error proceeding with Google', error);
    }
  };

  return (
    <button
    onClick={handleGoogleClick}
    type='button'
    className='bg-indigo-500 text-slate-300 p-2 rounded-md hover:bg-opacity-90 focus:outline-none'
    >
      Continue with Google
    </button>
  )
}