import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from "../components/OAuth";
import { motion } from 'framer-motion';
import { useEffect } from "react";


export default function SignIn() {
  const [isFirstClick, setIsFirstClick] = useState(true);
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  useEffect(() => {
    dispatch(signInFailure(null));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(isFirstClick){
      setIsFirstClick(false);
    }else{
      try {
        dispatch(signInStart());
        const response = await axios.post('/server/auth/signin', formData, {
          headers: {
            "Content-Type": "application/json",
          }
        });
        const data = response.data;
        if (data.success === false) {
          dispatch(signInFailure(data.message));
          return;
        }
        dispatch(signInSuccess(data));
        navigate('/profile');
      } catch (error) {
        dispatch(signInFailure(error.response.data.message));
      }
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-48 p-6 lg:p-2">
      <h1 className='text-slate-300 text-center text-xl mb-8'>
        Log in to IssueTracker
      </h1>
      <div className="flex flex-col gap-5">
        <OAuth />
        {!isFirstClick && (
          <motion.div 
            className="flex flex-col gap-5"
            initial={{ scale: 0, y: 0, }}
            animate={{ scale:1, }}
            transition={{ duration: 0.3, ease: "easeInOut"}}
          >
            <input 
              type="email"
              placeholder="nilaypatel@gmail.com"
              id="email"
              className="border rounded-md p-2"
              required
              onChange={handleChange}
            />
            <input 
              type="password"
              placeholder="password"
              id="password"
              className="border rounded-md p-2"
              required
              onChange={handleChange}
            />
          </motion.div>
        )}
        <motion.button 
          onClick={handleSubmit}
          disabled={loading}
          className="bg-gray-700 text-slate-300 p-2 rounded-md hover:bg-opacity-85 disabled:bg-opacity-40"
          layout
        >
          {loading ? "Loading..." : "Log In"}
        </motion.button>
      </div>
      <div className="flex gap-3 mt-5">
        <p className="text-slate-300">
          New to IssueTracker?
        </p>
        <Link to={'/sign-up'}>
          <span className="text-indigo-400">
            Sign Up
          </span>
        </Link>
      </div>
      {error && <p className='text-red-600 mt-5'>{error}</p>}
    </div>
  );
}