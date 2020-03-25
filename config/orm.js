const conn = require("./connection.js");

const orm = {
  select: function(table, cb) {
    const queryString = "SELECT * FROM ??";
    const query = conn.query(queryString, [table], function(err, result) {
      cb(err, result);
    });
    console.log(query.sql);
  },
  selectWhere: function(table, col, val, cb) {
    const queryString = "SELECT * FROM ?? WHERE ?? = ?";
    const query = conn.query(queryString, [table, col, val], function(err, result) {
      cb(err, result);
    });
    console.log(query.sql);
  },
  create: function(table, vals, cb) {
    const sql = "insert into ?? set ?";

    const query = conn.query(sql, [table, vals], (err, result) => {
      cb(err, result);
    });
    console.log(query.sql);
  },
  update: function(table, cols, id, cb) {
    const query = conn.query("update ?? set ? where id=?", [table, cols, id], (err, result) => {
      cb(err, result);
    });
    console.log(query.sql);
  },
  delete: function(table, id, cb) {
    const query = conn.query("delete from employees where id=?", [id], (err, result) => {
      cb(err, result);
    });
    console.log(query.sql);
  }
};

module.exports = orm;
