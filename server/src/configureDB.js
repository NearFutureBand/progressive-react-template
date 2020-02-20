const mysql = require('mysql');
const connectionConfig = {
  host: 'localhost',
  user: 'root',
  password: 'rootroot',
  database: 'testdb'
};

class DB {
  constructor(connectionConfig) {
    this.connection = mysql.createConnection(connectionConfig);
  }
  connect = () => this.connection.connect()
  disconnect = () => this.connection.end()
  query = (queryString) => {
    return new Promise((resolve, reject) => {
      this.connection.query(queryString, (error, results, fields) => {
        if (error) reject(error);
        else {
          resolve({
            data: results,
            results,
            fields
          });
        }
      });
    })
  }
}

db = new DB(connectionConfig);
db.connect();

module.exports = db;