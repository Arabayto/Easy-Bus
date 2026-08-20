-- Cloudflare D1 Database Schema for Easy Bus PWA
-- Can be executed with: npx wrangler d1 execute <DATABASE_NAME> --file=./schema.sql

-- 1. Vehicles Table
CREATE TABLE IF NOT EXISTS vehicles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category TEXT NOT NULL CHECK (category IN ('school_bus', 'university_car')),
  car_model TEXT NOT NULL,
  plate_number TEXT NOT NULL UNIQUE,
  seats INTEGER NOT NULL DEFAULT 15,
  available_seats INTEGER NOT NULL DEFAULT 15,
  status TEXT NOT NULL DEFAULT 'Available' CHECK (status IN ('Available', 'In Use', 'Maintenance')),
  city TEXT NOT NULL CHECK (city IN ('Hargeisa', 'Burao', 'Berbera', 'Borama', 'Erigavo', 'Las Anod')),
  shift TEXT NOT NULL DEFAULT 'both' CHECK (shift IN ('morning', 'afternoon', 'both')),
  driver_name TEXT NOT NULL,
  driver_national_id TEXT NOT NULL,
  driver_phone_number TEXT NOT NULL,
  driver_status TEXT NOT NULL DEFAULT 'online' CHECK (driver_status IN ('online', 'offline')),
  driver_avatar TEXT,
  image_url TEXT NOT NULL,
  additional_images TEXT, -- JSON Array string of photo URLs (min 4 total photos)
  rating REAL DEFAULT 5.0,
  reviews_count INTEGER DEFAULT 0,
  price_per_month TEXT,
  features TEXT, -- JSON Array string of amenities
  institution_affiliation TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Booking Requests Table
CREATE TABLE IF NOT EXISTS bookings (
  id TEXT PRIMARY KEY,
  vehicle_id INTEGER NOT NULL,
  vehicle_model TEXT NOT NULL,
  vehicle_plate TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('school_bus', 'university_car')),
  client_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  institution_name TEXT NOT NULL,
  city TEXT NOT NULL,
  shift TEXT NOT NULL CHECK (shift IN ('morning', 'afternoon', 'both')),
  pickup_location TEXT NOT NULL,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'contacted', 'rejected')),
  unread INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE
);

-- Indexes for lightning-fast regional & category queries
CREATE INDEX IF NOT EXISTS idx_vehicles_city ON vehicles(city);
CREATE INDEX IF NOT EXISTS idx_vehicles_category ON vehicles(category);
CREATE INDEX IF NOT EXISTS idx_vehicles_status ON vehicles(status);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_unread ON bookings(unread);
