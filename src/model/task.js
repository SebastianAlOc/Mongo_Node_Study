const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Defining a new schema for mongodb
const TaskSchema = Schema({
//Indicating we'll have three elements on the object, title, descripcion 
  title: String,
  description: String,
  status: {
    type: Boolean,
    //Assigning a default value to the bolean
    default: false
  }
});

//Takes the schema and saves it as a collection for mongodb
module.exports = mongoose.model('tasks', TaskSchema);