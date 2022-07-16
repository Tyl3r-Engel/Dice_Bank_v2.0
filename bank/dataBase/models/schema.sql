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

INSERT INTO users (username, userpass) VALUES ('admin', '$2b$10$S8fevy2Ibi2JNIQ1msQHcuh/ES5oTya2l83mgz3PjAzSUlArCGCgW');

INSERT INTO accounts (userid,type,options, status,name,defaultname,dateopened,balance,accountnumber,accountsecret)
VALUES (1,'creditCard','{"maxBal":1000000,"interestRate":".005"}',false,'test card cc','Standard Credit Card','1/01/01',0,1000000000,'test-test');

INSERT INTO transactions (accountnumber, fromname, amount, date, waswithdrawl)
VALUES ('1000000000', 'CostCo', 100.32, '03/11/2011', true);

INSERT INTO transactions (accountnumber, fromname, amount, date, waswithdrawl)
VALUES ('1000000000', 'Payment Made', 50, '01/17/2021', false);

INSERT INTO transactions (accountnumber, fromname, amount, date, waswithdrawl)
VALUES ('1000000000', 'Target', 33.22, '05/21/2012', true);

INSERT INTO transactions (accountnumber, fromname, amount, date, waswithdrawl)
VALUES ('1000000000', 'Wally World', 100.32, '01/17/2021', true);


INSERT INTO accounts (userid,type,options, status,name,defaultname,dateopened,balance,accountnumber,accountsecret)
VALUES (1,'checking','{"interestRate":"10"}',false,'test card c','Standard Checking','1/01/01',100000000000,2000000000,'test-test');

INSERT INTO transactions (accountnumber, fromname, amount, date, waswithdrawl)
VALUES ('2000000000', 'yellow', 42.22, '03/11/2011', false);

INSERT INTO transactions (accountnumber, fromname, amount, date, waswithdrawl)
VALUES ('2000000000', 'store', 77.42, '05/21/2012', true);

INSERT INTO transactions (accountnumber, fromname, amount, date, waswithdrawl)
VALUES ('2000000000', 'other store', 101.32, '01/17/2021', true);



-- INSERT INTO accounts (userid, type, options, status, name, amount, dateopened, number, routing)
-- VALUES ('1', 'savings', '{}', true, 'my savings', 142222, '02/12/2001', 133323, 78354);

-- INSERT INTO transactions (accountid, fromname, amount, date, waswithdrawl)
-- VALUES ('3', 'blue', 42.22, '03/11/2011', false);

-- INSERT INTO transactions (accountid, fromname, amount, date, waswithdrawl)
-- VALUES ('3', 'bill', 707.42, '05/21/2012', true);

-- INSERT INTO transactions (accountid, fromname, amount, date, waswithdrawl)
-- VALUES ('3', 'other bill', 132, '01/17/2021', true);
