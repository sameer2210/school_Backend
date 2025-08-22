-- Create database (run once if not exists)
-- CREATE DATABASE schooldb;
-- USE schooldb;

CREATE TABLE IF NOT EXISTS schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(500) NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Helpful index for geo-queries
CREATE INDEX IF NOT EXISTS idx_schools_lat_lon ON schools (latitude, longitude);
