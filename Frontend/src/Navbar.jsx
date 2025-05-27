import { Link,NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <div className='flex flex-row gap-4 p-4 bg-gray-100 shadow'>
      <NavLink to='/' className='hover:underline'>Home</NavLink>
      <NavLink to='/map' className='hover:underline'>Map</NavLink>
      <NavLink to='/audiobook' className='hover:underline'>AudioBook</NavLink>
      <NavLink to='/books' className='hover:underline'>Books</NavLink>
      <NavLink to='/ebooks' className='hover:underline'>Ebooks</NavLink>
      <NavLink to='/login' className='hover:underline'>Login</NavLink>
    </div>
  );
}

export default Navbar;
