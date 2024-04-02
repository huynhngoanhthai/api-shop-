// Export constants server
exports.POST = process.env.POST;

// Export constants MySQL
exports.HOST = process.env.HOST;
exports.USERNAME = process.env.ADMIN;
exports.PASSWORD = process.env.PASSWORD;
exports.DATABASE = process.env.DATABASE;
// Export constants name table
exports.TABLE_USER = process.env.TABLE_USER;
exports.SALT = process.env.SALT;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.ROLE_USER = process.env.ROLE_USER;
exports.ROLE_STAFF = process.env.ROLE_STAFF;
exports.ROLE_MANAGER =  process.env.ROLE_MANAGER;
// QUERY MYSQL 
exports.QUERY_GET_AREAS = "SELECT * FROM areas"