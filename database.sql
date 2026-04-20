CREATE TABLE users (
id_user  SERIAL PRIMARY KEY,
nom VARCHAR(100) NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL,
mot_de_passe VARCHAR(255) NOT NULL,
role VARCHAR(20) DEFAULT 'user',
date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);
CREATE TABLE annonces (
  id_annonces SERIAL PRIMARY KEY,
  titre VARCHAR(255) NOT NULL,
  description TEXT,
  type_travail VARCHAR(100),
  prix FLOAT,
  wilaya VARCHAR(100),
  date_publication TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  id_user INT,
  FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE
);
CREATE TABLE forum (
  id_forum SERIAL PRIMARY KEY,
  titre VARCHAR(255) NOT NULL,
  contenu TEXT,
  date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  id_user INT,
  FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE
);