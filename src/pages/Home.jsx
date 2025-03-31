import React, { useState } from 'react';
import './Home.css';
import Footer from '../components/Footer';
import MultilangWelcome from '../components/MultilangWelcome';
import DOMPurify from 'dompurify';

function Home() {
  const [email, setEmail] = useState("");
  const [sujet, setSujet] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailClean = DOMPurify.sanitize(email.trim());
    const sujetClean = DOMPurify.sanitize(sujet.trim());
    const messageClean = DOMPurify.sanitize(message.trim());

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailClean)) {
      setError("Adresse email invalide.");
      return;
    }

    if (sujetClean === "") {
      setError("Le sujet est requis.");
      return;
    }

    if (messageClean.length < 10) {
      setError("Le message doit contenir au moins 10 caractères.");
      return;
    }

    setError("");
    alert("Message envoyé !");
    // reset form
    setEmail("");
    setSujet("");
    setMessage("");
  };

  return (
    <div className="home-container">
      {/* SECTION 1 : Vidéo + Titre */}
      <section className="section-intro">
        <video autoPlay loop muted className="background-video">
          <source src="/images/radioroller.mp4" type="video/mp4" />
          Votre navigateur ne supporte pas la lecture vidéo.
        </video>
        <div className="intro-overlay">
          <h1 className="bienvenue-text">Connectify</h1>
        </div>
      </section>

      {/* SECTION 2 : Bienvenue */}
      <section className="section-bienvenue">
        <div className="bienvenue-overlay">
          <MultilangWelcome />
          <p>“Harmonisez vos passions, partagez vos émotions avec Connectify !”</p>
        </div>
      </section>

      {/* SECTION 3 : Actualité */}
      <section className="section-actualite-2cols">
        <div className="actualite-image"></div>
        <div className="actualite-text">
          <h2>Actualité</h2>
          <p>
            Le lieu où vous pouvez vous connecter avec vos amis, partager des moments spéciaux et explorer de nouvelles rencontres.<br /><br />
            Exprimez-vous à travers des photos, des vidéos et des messages, et découvrez le monde passionnant de la communauté Connectify.<br /><br />
            Rejoignez-nous dès maintenant et commencez à créer des liens, à inspirer et à être inspiré.
          </p>
        </div>
      </section>

      {/* SECTION 4 : Qui sommes-nous */}
      <section className="section-qui">
        <div className="qui-text">
          <h2>Qui sommes-nous ?</h2>
          <p>
            Chez Connectify, nous sommes une plateforme sociale dynamique et inclusive, dédiée à connecter les individus du monde entier.
            <br /><br />
            Notre objectif est de créer un espace numérique où chacun peut s’exprimer librement, partager ses passions et tisser des liens authentiques.
          </p>
        </div>
        <div className="qui-image"></div>
      </section>

      {/* SECTION 5 : Contact */}
      <section className="section-contact">
        <div className="contact-image"></div>
        <div className="contact-form">
          <h2>Nous Contacter</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Entrez votre email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Sujet..."
              value={sujet}
              onChange={(e) => setSujet(e.target.value)}
              required
            />
            <textarea
              placeholder="Écrivez votre message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
            <button type="submit">Valider</button>
            {error && <p className="error">{DOMPurify.sanitize(error)}</p>}
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
