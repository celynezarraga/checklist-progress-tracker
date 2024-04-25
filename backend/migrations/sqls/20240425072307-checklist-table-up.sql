-- init checklist table

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE checklist(
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(500),
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL,
  created_by uuid NOT NULL,
  FOREIGN KEY (created_by) REFERENCES "users" (id)
);