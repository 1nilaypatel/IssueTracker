import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="max-w-sm mx-auto mt-48">
      <h1 className='text-slate-300 text-center text-xl mb-8'>
        Create your IssueTracker account
      </h1>
      <form className="flex flex-col gap-5">
        <input 
          type="text"
          placeholder="nilaypatel"
          id="username"
          className="border rounded-md p-2"
        />
        <input 
          type="email"
          placeholder="nilaypatel@gmail.com"
          id="email"
          className="border rounded-md p-2"
        />
        <input 
          type="password"
          placeholder="password"
          id="password"
          className="border rounded-md p-2"
        />
        <button 
          className="bg-indigo-900 text-slate-300 p-2 rounded-md hover:bg-opacity-80 disabled:bg-opacity-40"
        >
          Sign Up
        </button>
      </form>
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
    </div>
  )
}