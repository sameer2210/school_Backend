CREATE DATABASE IF NOT EXISTS schooldb;
USE schooldb;

CREATE TABLE IF NOT EXISTS schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  latitude DOUBLE,
  longitude DOUBLE,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  contact BIGINT NOT NULL,
  image VARCHAR(255) NOT NULL,
  email_id VARCHAR(255) NOT NULL
);

-- Index to speed distance queries (if latitude/longitude are provided)
CREATE INDEX idx_schools_lat_lon ON schools (latitude, longitude);