import Mysql from 'promise-mysql';

export default class {
  constructor(db, name) {
    this._db = db;
    this._name = name;
  }

  // }).then(function(rows){
  //     // Query the items for a ring that Frodo owns.
  //     return connection.query('select * from items where `owner`="' + rows[0].id + '" and `name`="ring"');
  // }).then(function(rows){
  //     // Logs out a ring that Frodo owns
  //     console.log(rows);
  // });
  find(id) {
    // FIXME handle id type
    this._db.query(`SELECT * FROM ${this._name} WHERE uid='${id}'`)
      .then(function(rows) {
        return rows;
      });
  }

  count(filter) {
    // TODO filter
    this._db.query(`SELECT COUNT('x') AS count FROM ${this._name}`)
  }

  list(filter) {
    // TODO filter
    this._db.query(`SELECT * FROM ${this._name}`)
      .then(function(rows) {
        return rows;
      });
  }
};
