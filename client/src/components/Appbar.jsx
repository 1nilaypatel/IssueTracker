import { useSelector } from 'react-redux';
import {AuthenticatedAppbar, UnauthenticatedAppbar} from '../components';

export default function Appbar() {
  const {currentUser} = useSelector((state) => state.user);

  return (
    <header className='bg-slate-950 shadow-2xl fixed top-0 w-full z-50'>
      <div>
      {currentUser ? (
        <AuthenticatedAppbar />
      ):(
        <UnauthenticatedAppbar />
      )}
      </div>
    </header>
  );
}