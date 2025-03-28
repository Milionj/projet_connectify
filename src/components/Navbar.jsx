import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import './Navbar.css';

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">Connectify</Link>

        <ul className="navbar-links">
          <li>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
              Accueil
            </Link>
          </li>

          {!user && (
            <>
              <li><Link to="/login">Connexion</Link></li>
              <li>
                <Link to="/signup" className="btn-inscription">
                  Inscription
                </Link>
              </li>
            </>
          )}

          {user && (
            <>
              <li><Link to="/profile">Profil</Link></li>
              <li>
                <button onClick={handleLogout} className="logout-btn">
                  Déconnexion
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
