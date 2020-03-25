const orm = require("../config/orm");

const employee = {
  getAll: function(cb) {
    orm.select("employees", (err, data) => cb(err, data));
  },
  getById: function(id, cb) {
    orm.selectWhere("employees", "id", id, (err, data) => cb(err, data));
  },
  create: function(data, cb) {
    orm.create("employees", data, (err, data) => cb(err, data));
  },
  update: function(id, data, cb) {
    orm.update("employees", data, id, (err, data) => cb(err, data));
  },
  deleteById: function(id, cb)  {
    orm.delete("employees", id, (err, data) => cb(err, data));
  }
};

module.exports = employee;
