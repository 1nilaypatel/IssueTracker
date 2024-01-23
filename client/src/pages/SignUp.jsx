import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import OAuth from "../components/OAuth";
import { motion } from 'framer-motion';

export default function SignUp() {
  const [isFirstClick, setIsFirstClick] = useState(true);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(isFirstClick){
      setIsFirstClick(false);
    }else{
      try {
        setLoading(true);
        const response = await axios.post('/server/auth/signup', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = response.data;
        // console.log(data);
        if (data.success === false) {
          setLoading(false);
          setError(data.message);
          return;
        }
        setLoading(false);
        setError(null);
        navigate('/sign-in');
      } catch (error) {
        setLoading(false);
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-48">
      <h1 className='text-slate-300 text-center text-xl mb-8'>
        Create your IssueTracker account
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
              type="text"
              placeholder="nilaypatel"
              id="username"
              className="border rounded-md p-2"
              required
              onChange={handleChange}
            />
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
        >
          {loading ? "Loading..." : "Sign Up"}
        </motion.button>
      </div>
      <div className="flex gap-3 mt-5">
        <p className="text-slate-300">
          Already a user!
        </p>
        <Link to={'/sign-in'}>
          <span className="text-indigo-400">
            Log In
          </span>
        </Link>
      </div>
      {error && <p className='text-red-600 mt-5'>{error}</p>}
    </div>
  )
}