import { useSelector } from 'react-redux';
import {AuthenticatedAppbar, UnauthenticatedAppbar} from '../components';

export default function Appbar() {
  const {currentUser} = useSelector((state) => state.user);

  return (
    <header className='bg-black shadow-md'>
      <div>
      {currentUser ? (
        <AuthenticatedAppbar currentUser={currentUser} />
      ):(
        <UnauthenticatedAppbar />
      )}
      </div>
    </header>
  );
}