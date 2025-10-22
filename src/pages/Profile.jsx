import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import DOMPurify from 'dompurify';
import './Profile.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('all');
  const [modalImage, setModalImage] = useState(null);
  const [message, setMessage] = useState(''); // 🔒 message utilisateur

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      } else {
        navigate('/login');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="profile-page">
      <Navbar />

      {/* ======== BANNIÈRE ======== */}
      <header className="profile-header">
        <div className="banner-image">
          <div className="profile-overlay">
            <div
              className="avatar"
              style={{ backgroundImage: `url(${userData?.avatarUrl || '/images/avatar-default.png'})` }}
            ></div>
            <div className="profile-name-box">
              <h2 className="profile-nom">{userData?.nom || 'Nom'}</h2>
              <h2 className="profile-prenom">{userData?.prenom || 'Prénom'}</h2>
            </div>
          </div>
        </div>
      </header>

      {/* ======== CORPS ======== */}
      <main className="profile-main-wrapper">
        <aside className="profile-sidebar">
          {['all', 'walls', 'gallery', 'video', 'music'].map((section) => (
            <button
              key={section}
              className={`profile-btn ${activeSection === section ? 'active-btn' : ''}`}
              onClick={() => setActiveSection(section)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </aside>

        <section className="profile-content">
          {/* ==== WALL ==== */}
          {(activeSection === 'all' || activeSection === 'walls') && (
            <section className="profile-walls">
              <h2 className="section-title">My Walls</h2>
              <div className="wall-wrapper">
                <div className="wall-post">
                  <div className="wall-header">
                    <h3>Le Rap US &gt;&gt;&gt; Rap FR</h3>
                    <span className="wall-time">8:10</span>
                  </div>
                  <div className="wall-image-section">
                    <img src="/images/homer.jpeg" alt="Wall" className="wall-image" />
                    <div
                      className="wall-comment"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(message),
                      }}
                    />
                    <span className="wall-time">14:20</span>
                  </div>
                </div>
                <div className="message-box">
                  <input
                    type="text"
                    className="comment-input"
                    placeholder="Écrivez un message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <div className="icons">
                    <button className="btn-download"></button>
                    <button className="btn-send"></button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ==== GALLERY ==== */}
          {(activeSection === 'all' || activeSection === 'gallery') && (
            <section className="profile-gallery">
              <h2 className="section-title">Gallery</h2>
              <div className="gallery">
                {['joliecoeur.jpg', 'disques.jpg', 'silouette.jpg', 'lequipe.jpg'].map((imgName, index) => (
                  <img
                    key={index}
                    src={`/images/${imgName}`}
                    alt={`Gallery ${index + 1}`}
                    className="gallery-img-clickable"
                    onClick={() => setModalImage(`/images/${imgName}`)}
                  />
                ))}
              </div>
            </section>
          )}

          {/* ==== MODAL ==== */}
          {modalImage && (
            <div className="modal-overlay" onClick={() => setModalImage(null)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={() => setModalImage(null)}>×</button>
                <img src={modalImage} alt="Zoomed" className="modal-image" />
              </div>
            </div>
          )}

          {/* ==== VIDEO ==== */}
          {(activeSection === 'all' || activeSection === 'video') && (
            <section className="profile-video">
              <h2 className="section-title">Video</h2>
              <div className="video-container">
                <video className="profil-video" controls>
                  <source src="/images/videoprofil.mp4" type="video/mp4" />
                  Votre navigateur ne prend pas en charge la lecture de vidéos.
                </video>
              </div>
            </section>
          )}

          {/* ==== MUSIC ==== */}
          {(activeSection === 'all' || activeSection === 'music') && (
            <section className="profile-music">
              <h2 className="section-title">Music</h2>
              <div className="music-container">
                <div className="music-item">
                  <img className="music-covern" src="/images/album-hip-hop.png" alt="Cover 1" />
                  <p className="music-title">RioGane - Down</p>
                  <audio controls>
                    <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mp3" />
                  </audio>
                </div>
                <div className="music-item">
                  <img className="music-cover" src="/images/album-hop.png" alt="Cover 2" />
                  <p className="music-title">Grange - WAP</p>
                  <audio controls>
                    <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" type="audio/mp3" />
                  </audio>
                </div>
              </div>
            </section>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
