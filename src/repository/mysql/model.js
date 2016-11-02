import Mysql from 'promise-mysql';

export default class {
  constructor(db, name) {
    this._db = db;
    this._name = name;
  }

  find(id) {
    // FIXME handle id type
    return this._db.connection.query(`SELECT * FROM ${this._name} WHERE uid='${id}'`)
      // .then(function(rows) {
      //   return rows;
      // });
  }

  count(filter) {
    // TODO filter
    return this._db.query(`SELECT COUNT('x') AS count FROM ${this._name}`)
  }

  list(filter) {
    // TODO filter
    return this._db.query(`SELECT * FROM ${this._name} LIMIT 1000`);
  }
};
