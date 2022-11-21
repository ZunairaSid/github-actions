import { useSession } from 'next-auth/react';
import { signIn, signOut } from 'next-auth/react';
export const Navbar = () => {
  const session = useSession();

  const loggedInContent = (
    <ul className='navbar-nav'>
      <li className='nav-item'>
        <a className='nav-link' href='#'>
          Profile
        </a>
      </li>
      <li className='nav-item'>
        <a className='nav-link' href='#'>
          Settings
        </a>
      </li>
      <li
        className='nav-item'
        onClick={(e) => {
          e.preventDefault();
          console.log('signing in');
          signOut({ callbackUrl: '/' });
        }}
      >
        <a className='nav-link' href='#'>
          Logout
        </a>
      </li>

      <li className='nav-item'>
        <a className='nav-link' href='#'>
          Cart
        </a>
      </li>
    </ul>
  );

  const notLoggedInContent = (
    <ul className='navbar-nav'>
      <li
        className='nav-item'
        onClick={(e) => {
          e.preventDefault();
          signIn('keycloak', { callbackUrl: '/' });
        }}
      >
        <a className='nav-link' href='#'>
          Login
        </a>
      </li>
      <li className='nav-item'>
        <a className='nav-link' href={process.env.REGISTER_USER}>
          Register
        </a>
      </li>

      <li className='nav-item'>
        <a className='nav-link' href='#'>
          Cart
        </a>
      </li>
    </ul>
  );

  return (
    <nav className='navbar navbar-expand-lg fixed-top navbar-dark bg-dark'>
      <a className='navbar-brand' href='#'>
        Spacemoon
      </a>
      <div className='container-fluid'>
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <a className='nav-link' href='#'>
              Planet 1
            </a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='#'>
              Planet 2
            </a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='#'>
              Planet 3
            </a>
          </li>
        </ul>
        <form className='d-flex' role='search'>
          <div className='input-group'>
            <input
              className='form-control me-2'
              type='search'
              placeholder='Search'
              aria-label='Search'
            />
            <button
              className='btn btn-outline-success my-2 my-sm-0'
              type='button'
            >
              Search
            </button>
          </div>
        </form>
        {session.data ? loggedInContent : notLoggedInContent}
      </div>
    </nav>
  );
};
