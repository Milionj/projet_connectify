import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import Footer from '../components/Footer';
import './Signup.css';
import DOMPurify from 'dompurify';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    confirmPassword: '',
    genre: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'radio' ? value : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // Sanitize all fields before sending to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        nom: DOMPurify.sanitize(formData.nom),
        prenom: DOMPurify.sanitize(formData.prenom),
        genre: DOMPurify.sanitize(formData.genre),
        email: DOMPurify.sanitize(formData.email),
        createdAt: new Date()
      });

      navigate('/profile');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-container">
        <div className="signup-left" />

        <div className="signup-right">
          <h2 className="signup-title">Inscription</h2>

          <div className="signup-form-box">
            <form onSubmit={handleSubmit}>
              <div className="name-fields">
                <div>
                  <label>Nom :</label>
                  <input
                    type="text"
                    name="nom"
                    placeholder="Entrez votre nom..."
                    value={formData.nom}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>Prénom :</label>
                  <input
                    type="text"
                    name="prenom"
                    placeholder="Entrez votre prénom..."
                    value={formData.prenom}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <label>Email :</label>
              <input
                type="email"
                name="email"
                placeholder="Entrez votre email..."
                value={formData.email}
                onChange={handleChange}
                required
              />

              <div className="signup-gender">
                <label>Genre :</label>
                <label>
                  <input
                    type="radio"
                    name="genre"
                    value="homme"
                    checked={formData.genre === 'homme'}
                    onChange={handleChange}
                    required
                  /> Homme
                </label>
                <label>
                  <input
                    type="radio"
                    name="genre"
                    value="femme"
                    checked={formData.genre === 'femme'}
                    onChange={handleChange}
                    required
                  /> Femme
                </label>
              </div>

              <label>Mot de passe :</label>
              <input
                type="password"
                name="password"
                placeholder="Entrez votre mot de passe..."
                value={formData.password}
                onChange={handleChange}
                required
              />

              <label>Vérification de mot de passe :</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirmez votre mot de passe..."
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />

              {/* Protection XSS sur message d’erreur */}
              {error && (
                <p
                  className="signup-error"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(error) }}
                />
              )}

              <button type="submit">Valider</button>
            </form>

            <div className="signup-footer">
              Déjà inscrit ? <Link to="/login">Connectez-vous</Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Signup;
