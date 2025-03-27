import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // nettoyage
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <nav className="bg-[#216249] px-6 py-4 text-white shadow flex justify-between items-center">
      <Link to="/" className="text-xl font-bold tracking-wide">Connectify</Link>

      <ul className="flex gap-5 items-center text-sm">
        <li><Link to="/" className="hover:text-[#daca3b]">Accueil</Link></li>

        {!user && (
          <>
            <li><Link to="/login" className="hover:text-[#daca3b]">Connexion</Link></li>
            <li><Link to="/signup" className="hover:text-[#daca3b]">Inscription</Link></li>
          </>
        )}

        {user && (
          <>
            <li><Link to="/profile" className="hover:text-[#daca3b]">Profil</Link></li>
            <li>
              <button onClick={handleLogout} className="hover:text-[#daca3b]">
                Déconnexion
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
