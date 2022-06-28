DROP DATABASE dice_bank;
CREATE DATABASE dice_bank;
\c dice_bank

DROP TABLE IF EXISTS sessions;
CREATE TABLE sessions (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255),
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
  id SERIAL PRIMARY KEY,
  userid INT,
  type VARCHAR(255),
  options JSON,
  status BOOLEAN,
  name VARCHAR(255),
  dateopened DATE,
  amount FLOAT,
  number INT,
  routing INT,
  FOREIGN KEY (userid) REFERENCES users (id)
);

DROP TABLE IF EXISTS transactions;
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  accountid INT,
  fromname VARCHAR(255),
  amount FLOAT,
  date DATE,
  waswithdrawl BOOLEAN,
  FOREIGN KEY (accountid) REFERENCES accounts (id)
);

INSERT INTO users (username, userpass) VALUES ('admin', '$2b$10$S8fevy2Ibi2JNIQ1msQHcuh/ES5oTya2l83mgz3PjAzSUlArCGCgW');

INSERT INTO accounts (userid, type, options, status, name, amount, dateopened, number, routing)
VALUES ('1', 'checking', '{}', true, 'my checking', 100422.22, '02/12/2001', 314323, 323142);

INSERT INTO transactions (accountid, fromname, amount, date, waswithdrawl)
VALUES ('1', 'CostCo', 100.32, '03/11/2011', true);

INSERT INTO transactions (accountid, fromname, amount, date, waswithdrawl)
VALUES ('1', 'Target', 33.22, '05/21/2012', true);

INSERT INTO transactions (accountid, fromname, amount, date, waswithdrawl)
VALUES ('1', 'Wally World', 100.32, '01/17/2021', true);


select * --, transactions as transactions
from accounts
join transactions on accounts.id=transactions.accountid