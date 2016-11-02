import Url from 'url';
import Mysql from 'promise-mysql';
import MysqlModel from './model';

export default class {
  constructor(uri, driverOptions) {
    this._driverOptions = driverOptions;
    this._connectionUri = uri;
    this._driverOptions = driverOptions;
  }

  model(name) {
    return new MysqlModel(name);
  }

  query(sql) {
    return this.createConnection()
      .then((conn) => {
        return conn.query(sql);
      })
      .then((rows) => {
        return rows;
      })
  }

  createConnection() {
    const _url = Url.parse(this._connectionUri, true, true);
    return Mysql.createConnection(
      { host: _url.host,
        user: _url.query.username,
        password: _url.query.password,
        database: _url.pathname.substring(1) }
    );
  }
}
