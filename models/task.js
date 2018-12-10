const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

class Task {
  constructor(task, day, id) {
    this.task = task;
    this.day = day;
    this.completed = false;
    this.users = [];
    this.note = '';
    this.list = 'tasks';
    this._id = id;
  }

  save() {
    const db = getDb();
    db.collection('tasks')
      .insertOne(this)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static updateTask(task) {
    task._id = new mongodb.ObjectId(task._id);
    const db = getDb();
    db.collection('tasks')
      .updateOne({ _id: task._id }, { $set: task })
      .then((result) => {
        console.log('Updated task');
      })
      .catch((err) => {
        console.log('Error meatbag. Go home and rethink your life.', err);
      });
  }

  static getAllTasks() {
    const db = getDb();
    return db.collection('tasks')
      .find()
      .toArray();
  }

  static deleteByID(id) {
    const db = getDb();
    return db
      .collection('tasks')
      .deleteOne({ _id: new mongodb.ObjectId(id) })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}


module.exports = Task;
