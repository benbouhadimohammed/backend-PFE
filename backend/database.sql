CREATE TABLE users (
id_user  SERIAL PRIMARY KEY,
nom VARCHAR(100) NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL,
mot_de_passe VARCHAR(255) NOT NULL,
rolee VARCHAR(20) DEFAULT 'user',
date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
CREATE TABLE sujets_forum (
  id           SERIAL PRIMARY KEY,
  titre        VARCHAR(255) NOT NULL,
  contenu      TEXT         NOT NULL,
  auteur_id    INT          NOT NULL REFERENCES users(id_user) ON DELETE CASCADE,
  est_ferme    BOOLEAN      NOT NULL DEFAULT FALSE,
  date_creation TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE commentaires_forum (
  id           SERIAL PRIMARY KEY,
  sujet_id     INT          NOT NULL REFERENCES sujets_forum(id) ON DELETE CASCADE,
  contenu      TEXT         NOT NULL,
  auteur_id    INT          NOT NULL REFERENCES users(id_user) ON DELETE CASCADE,
  est_supprime BOOLEAN      NOT NULL DEFAULT FALSE,
  date_envoi   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);