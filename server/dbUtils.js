/**
 * Created by luzga_000 on 10/06/2017.
 */
import { MongoClient, ObjectId } from 'mongodb';
import test from 'assert';
import config from './config';

const url = `mongodb://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.name}`;
let _db;

module.exports = {
  connectToServer: () => new Promise((resolve, reject) => {
    try {
      MongoClient.connect(url, (err, db) => {
        _db = db;
        test.equal(null, err);
        test.ok(db.collections.length > 0);
        return resolve(db);
      });
    } catch (e) {
      reject(e);
    }
  }),

  getDb: () => _db,
  getObjectId: id => ObjectId(id),
};
