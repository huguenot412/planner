const getDb = require('../util/database').getDb;

class Task {
    constructor(task, day) {
        this.task = task;
        this.day = day;
        this.id = Symbol('task');
        this.completed = false;
        this.users = [];
        this.note = "";
        this.list = 'tasks';
    }

    save() {
        const db = getDb();
        db.collection('tasks')
            .insertOne(this)
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
    }

    delete() {
        const db = getDb();
        db.collection('tasks')
            .deleteOne({_id: this._id})
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
    }
}

module.exports = Task;