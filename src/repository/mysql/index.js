import Url from 'url';
import Mysql from 'promise-mysql';
import MysqlModel from './model';

export default class {
  constructor(uri, driverOptions) {
    this._driverOptions = driverOptions;
    this._connection = this.createConnection;
  }

  model(name) {
    return new MysqlModel(name);
  }

  createConnection(_uriString, _options) {
    const _url = Url.parse(_uriString, true, true);
    console.info(_url.query);
    var mysqlConnection = null;
    Mysql.createConnection(
      { host: _url.host,
        user: _url.query.username,
        password: _url.query.password,
        database: _url.pathname.substring(1) }
    ).then(function(conn) {
      mysqlConnection = conn;
    });
    return mysqlConnection;
  }
}
