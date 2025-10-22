import React, { useEffect, useState } from 'react';
import './MultilangWelcome.css'; // Assure-toi d'avoir bien ce fichier à côté

const languages = [
  "Bienvenue", "Welcome", "Bienvenido", "Willkommen", "Benvenuto",
  "Byenveni", "أهلاً وسهلاً", "ようこそ", "欢迎", "Добро пожаловать" , "Bienvéni",
];

function MultilangWelcome() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % languages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <h2 className="animated-text">{languages[index]}</h2>
  );
}

export default MultilangWelcome;
