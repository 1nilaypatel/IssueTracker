import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';


export default function SignIn() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.response.data.message));
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-48">
      <h1 className='text-slate-300 text-center text-xl mb-8'>
        Log in to IssueTracker
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input 
          type="email"
          placeholder="nilaypatel@gmail.com"
          id="email"
          className="border rounded-md p-2"
          onChange={handleChange}
        />
        <input 
          type="password"
          placeholder="password"
          id="password"
          className="border rounded-md p-2"
          onChange={handleChange}
        />
        <button 
          disabled={loading}
          className="bg-indigo-900 text-slate-300 p-2 rounded-md hover:bg-opacity-80 disabled:bg-opacity-40"
        >
          {loading ? "Loading..." : "Log In"}
        </button>
      </form>
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