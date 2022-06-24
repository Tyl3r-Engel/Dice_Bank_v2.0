DROP DATABASE dice_bank;
CREATE DATABASE dice_bank;
\c dice_bank

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  userName VARCHAR(255),
  userPass VARCHAR(255)
);

DROP TABLE IF EXISTS sessions;

CREATE TABLE sessions (
  id SERIAL PRIMARY KEY,
  userName VARCHAR(255),
  refreshToken VARCHAR(255)
);