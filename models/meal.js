const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

class Meal {
    constructor(name, day, id) {
        this.name = name;
        this.day = day;
        this.note = "";
        this.list = 'meals';
        this.type = "",
        this._id = id;
    }

    save() {
        const db = getDb();
        db.collection('meals')
            .insertOne(this)
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
    }

    static updateMeal(meal) {
        meal._id = new mongodb.ObjectId(meal._id);
        const db = getDb();
        db.collection('meals')
            .updateOne({ _id: meal._id }, { $set: meal })
            .then(result => {
                console.log("Updated meal");
            })
            .catch(err => {
                console.log("Error meatbag. Go home and rethink your life.", err);
            });
    }

    static getAllMeals() {
        const db = getDb();
        return db.collection('meals')
            .find()
            .toArray()
    }

    static deleteByID(id) {
        const db = getDb();
        return db
            .collection('meals')
            .deleteOne({_id: new mongodb.ObjectId(id)})
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
    }
}


module.exports = Meal;