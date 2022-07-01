
module.exports = {
  development: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "123456",
    database: process.env.DB_NAME || "EBYTR",
    host: process.env.DB_HOST || "localhost",
    dialect: process.env.DB_USER || "mysql",
  }
}
