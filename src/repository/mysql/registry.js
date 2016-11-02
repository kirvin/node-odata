import Mysql from 'promise-mysql';
import MysqlModel from './model';


const register = (_db, name, model) => {
  return new MysqlModel(_db, name);
}

export default { register };
