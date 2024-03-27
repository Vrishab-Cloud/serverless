const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const mysql = require("mysql2/promise");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];

const db = {};

let sequelize;

const init = async () => {
  let connection;
  try {
    const { host, port, username: user, password, database } = config;
    connection = await mysql.createConnection({
      host,
      port,
      user,
      password,
    });
    console.log(`Created connection MYSQL Database: ${database}`);
  } finally {
    if (connection) await connection.close();
  }
};

sequelize = new Sequelize(config.database, config.username, config.password, {
  ...config,
  logging: false,
});

const close = async () => {
  await sequelize.close();
};

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.init = init;
db.close = close;

module.exports = db;
