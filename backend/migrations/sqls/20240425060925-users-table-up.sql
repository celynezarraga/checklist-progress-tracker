-- init users table

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users(
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(100) UNIQUE,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL
);