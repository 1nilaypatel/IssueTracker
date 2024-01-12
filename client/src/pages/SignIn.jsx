import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function SignIn() {
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
    try {
      setLoading(true);
      const response = await axios.post('/server/auth/signin', formData, {
        headers: {
          "Content-Type": "application/json",
        }
      });
      const data = response.data;
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/');
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
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
          {loading ? "Loading..." : "Sign In"}
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