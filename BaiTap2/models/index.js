import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import { fileURLToPath, pathToFileURL } from 'url';
import process from 'process';

// === ESM compatibility for __dirname ===
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// === Load JSON config file ===
const env = process.env.NODE_ENV || 'development';
const configPath = path.resolve(__dirname, '../config/config.json');
const configFile = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
const config = configFile[env];

// === Init Sequelize ===
const sequelize = new Sequelize(config.database, config.username, config.password, config);
const db = {};

// === Load all model files dynamically ===
const basename = path.basename(__filename);
const files = fs.readdirSync(__dirname).filter((file) => {
  return file.indexOf('.') !== 0 && file !== basename && file.endsWith('.js');
});

for (const file of files) {
  const modelModule = await import(pathToFileURL(path.join(__dirname, file)));
  const model = modelModule.default(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
}

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
