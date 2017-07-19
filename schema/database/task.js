import _ from 'lodash';
import { ObjectId } from 'mongodb';
import { TaskStatusEnumType, mapEnums } from '../enums';
import { getDb, getObjectId } from '../../server/dbUtils';

const TaskStatusEnum = mapEnums(TaskStatusEnumType);

const getTasks = (limit = null, lastId = null) => {
  // lt instead of gt because of sort on createdAt
  const find = (lastId) ? { _id: { $lt: ObjectId(lastId) } } : {};
  const cursor = getDb().collection('tasks').find(find);

  if (limit) {
    cursor.limit(limit);
  }

  cursor.sort({ createdAt: -1 });

  return cursor
    .toArray().then(result => ({
      tasks: result,
      lastId: _.get((_.last(result)), '_id', null),
      numberReturned: result.length,
    }));
};
const getTask = id => getDb().collection('tasks').findOne({ _id: getObjectId(id) });
const getTasksCount = () => getDb().collection('tasks').count();


// MUTATIONS
const addTask = (name, status = TaskStatusEnum.READY) =>
  getDb().collection('tasks').insertOne({
    name,
    status,
    createdAt: Date.now(),
  }).then(result => getTask(result.insertedId));

const markDone = id =>
  getDb().collection('tasks').updateOne({ _id: getObjectId(id) }, { $set: { status: TaskStatusEnum.DONE } })
    .then(() => getTask(id));

// Add checker if something was actually deleted?
const deleteTask = id =>
  getDb().collection('tasks').deleteOne({ _id: getObjectId(id) })
    .then(() => true);


module.exports = {
  getTasks,
  getTasksCount,
  getTask,
  addTask,
  markDone,
  deleteTask,
};
