DROP DATABASE dice_bank;
CREATE DATABASE dice_bank;
\c dice_bank

DROP TABLE IF EXISTS sessions;
CREATE TABLE sessions (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255),
  userid INT,
  refreshtoken VARCHAR(255)
);

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255),
  userpass VARCHAR(255)
);

DROP TABLE IF EXISTS accounts;
CREATE TABLE accounts (
  id SERIAL,
  userid INT,
  type VARCHAR(255),
  options JSON,
  status BOOLEAN,
  name VARCHAR(255),
  defaultname VARCHAR(255),
  dateopened DATE,
  balance REAL,
  accountnumber BIGINT PRIMARY KEY,
  accountsecret VARCHAR(255),
  FOREIGN KEY (userid) REFERENCES users (id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS transactions;
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  accountnumber BIGINT,
  fromname VARCHAR(255),
  amount FLOAT,
  date DATE,
  waswithdrawl BOOLEAN,
  FOREIGN KEY (accountnumber) REFERENCES accounts (accountnumber) ON DELETE CASCADE
);
