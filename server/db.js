import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
const dir=path.join(process.cwd(),'data'); fs.mkdirSync(dir,{recursive:true});
const db=new DatabaseSync(path.join(dir,'terrawise.sqlite'));
db.exec('PRAGMA journal_mode = WAL;');
db.exec(`
CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, full_name TEXT NOT NULL, cni_hash TEXT NOT NULL UNIQUE, cni_encrypted TEXT NOT NULL, phone TEXT NOT NULL, password_hash TEXT NOT NULL, role TEXT NOT NULL CHECK(role IN ('farmer','seeker')), created_at TEXT DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS farms(id INTEGER PRIMARY KEY AUTOINCREMENT,user_id INTEGER NOT NULL REFERENCES users(id),name TEXT,location TEXT NOT NULL,latitude REAL,longitude REAL,area_ha REAL,crop TEXT,soil_type TEXT,ph REAL,ec REAL,organic_matter REAL,nitrogen REAL,phosphorus REAL,potassium REAL,water_source TEXT,updated_at TEXT DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS soil_tests(id INTEGER PRIMARY KEY AUTOINCREMENT,farm_id INTEGER NOT NULL REFERENCES farms(id),ph REAL,ec REAL,organic_matter REAL,nitrogen REAL,phosphorus REAL,potassium REAL,lab_name TEXT,test_date TEXT,notes TEXT);
CREATE TABLE IF NOT EXISTS crop_plans(id INTEGER PRIMARY KEY AUTOINCREMENT,user_id INTEGER NOT NULL REFERENCES users(id),farm_id INTEGER REFERENCES farms(id),crop TEXT NOT NULL,area_ha REAL,season TEXT,status TEXT DEFAULT 'planned',created_at TEXT DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS land_listings(id INTEGER PRIMARY KEY AUTOINCREMENT,owner_id INTEGER NOT NULL REFERENCES users(id),title TEXT NOT NULL,location TEXT NOT NULL,latitude REAL,longitude REAL,area_ha REAL NOT NULL,soil_type TEXT,water_source TEXT,price REAL NOT NULL,price_type TEXT NOT NULL CHECK(price_type IN ('rent_month','sale')),description TEXT,status TEXT DEFAULT 'active',created_at TEXT DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS land_requests(id INTEGER PRIMARY KEY AUTOINCREMENT,seeker_id INTEGER NOT NULL REFERENCES users(id),listing_id INTEGER NOT NULL REFERENCES land_listings(id),message TEXT,status TEXT DEFAULT 'pending',created_at TEXT DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS recommendations(id INTEGER PRIMARY KEY AUTOINCREMENT,user_id INTEGER NOT NULL REFERENCES users(id),farm_id INTEGER REFERENCES farms(id),payload TEXT NOT NULL,created_at TEXT DEFAULT CURRENT_TIMESTAMP);
`);
export default db;