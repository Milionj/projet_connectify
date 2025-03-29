import React from 'react';
import './Signup.css';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function Signup() {
  return (
    <div className="signup-wrapper">
      <div className="signup-container">
        <div className="signup-left" />

        <div className="signup-right">
          <h2 className="signup-title">Inscription</h2>
          <div className="signup-form-box">
            <form>
              <div className="name-fields">
                <div>
                  <label>Nom :</label>
                  <input type="text" placeholder="Entrez votre nom..." />
                </div>
                <div>
                  <label>Prénom :</label>
                  <input type="text" placeholder="Entrez votre prénom..." />
                </div>
              </div>

              <label>Email :</label>
              <input type="email" placeholder="Entrez votre email..." />

              <div className="signup-gender">
                <label>Genre :</label>
                <label><input type="radio" name="genre" /> Homme</label>
                <label><input type="radio" name="genre" /> Femme</label>
              </div>

              <label>Mot de passe :</label>
              <input type="password" placeholder="Entrez votre mot de passe..." />

              <label>Vérification de mot de passe :</label>
              <input type="password" placeholder="Entrez votre mot de passe..." />

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
