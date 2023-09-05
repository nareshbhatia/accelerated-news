import { useAuthStateContext } from '../AuthStateContextProvider';
import { AuthService } from '@/services';
import { FaSignOutAlt } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

export function Navbar() {
  const { authState, setAuthState } = useAuthStateContext();
  const { user } = authState;
  const navigate = useNavigate();

  /* istanbul ignore next */
  const handleSignIn = () => {
    navigate('/signin');
  };

  /* istanbul ignore next */
  const handleSignOut = async () => {
    await AuthService.signOut();
    // navigate before setting authState to avoid saving incorrect signInRedirect
    navigate('/');
    setAuthState({ ...authState, user: undefined });
  };

  return (
    <nav className="navbar">
      <span className="navbar__brand mobile">News</span>
      <span className="navbar__brand desktop">Accelerated News</span>

      <ul className="flex-1">
        <li>
          <NavLink className="navbar__link" end to="/">
            Headlines
          </NavLink>
        </li>
        <li>
          <NavLink className="navbar__link" end to="/sports">
            Sports
          </NavLink>
        </li>
      </ul>

      {user === undefined ? (
        <button
          aria-label="Sign in"
          className="navbar__signin btn-sm"
          onClick={handleSignIn}
        >
          Sign in
        </button>
      ) : undefined}

      {user !== undefined ? (
        <>
          <div className="navbar__username">{user.name}</div>
          <FaSignOutAlt
            aria-labelledby="Sign out"
            className="navbar__signout"
            onClick={handleSignOut}
          />
        </>
      ) : undefined}
    </nav>
  );
}
