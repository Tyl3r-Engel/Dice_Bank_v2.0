DROP DATABASE dice_bank;
CREATE DATABASE dice_bank;
\c dice_bank

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  userName VARCHAR(25) NOT NULL,
  userPass VARCHAR(60)
);

DROP TABLE IF EXISTS sessions;

CREATE TABLE sessions (
  id SERIAL PRIMARY KEY,
  sid VARCHAR(32) UNIQUE,
  expire TIMESTAMP,
  sess VARCHAR(255)
);