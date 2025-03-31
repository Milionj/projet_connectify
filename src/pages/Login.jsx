import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import './Login.css';
import DOMPurify from 'dompurify';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Nettoie les valeurs saisies (même si on ne les affiche pas)
    setFormData({ ...formData, [name]: DOMPurify.sanitize(value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      navigate('/profile');
    } catch (err) {
      // Nettoie l’erreur reçue
      setError(DOMPurify.sanitize('Email ou mot de passe incorrect.'));
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-left" />

        <div className="login-right">
          <h2 className="login-title">Connexion</h2>

          <div className="login-form-box">
            <form onSubmit={handleSubmit}>
              <label>Email :</label>
              <input
                type="email"
                name="email"
                placeholder="Entrez votre email..."
                value={formData.email}
                onChange={handleChange}
                required
              />

              <label>Mot de passe :</label>
              <input
                type="password"
                name="password"
                placeholder="Entrez votre mot de passe..."
                value={formData.password}
                onChange={handleChange}
                required
              />

              {error && (
                <p
                  className="login-error"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(error) }}
                />
              )}

              <button type="submit">Se Connecter</button>
            </form>

            <div className="login-footer">
              Pas de compte ? <Link to="/signup">Inscrivez-vous</Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Login;
