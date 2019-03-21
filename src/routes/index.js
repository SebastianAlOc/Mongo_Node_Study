const express = require('express');
const router = express.Router();
//"importing" task to perfom mongodb operations by the schema
const Task = require('../model/task');

//Querying the collection for specific documents
router.get('/', async (req, res) => {
  const tasks = await Task.find();
  //Rendering  the index.ejs since we already defined in app that every file within views will be .ejs no need for extension
  //Wil show the task that is queried within the table
  res.render('index', {
    tasks //-> Equals tasks: tasks
  });
});

//Add info to the collection by using async await
router.post('/add', async (req, res, next) => {
  //Create the object (document) to store within the db collection
  const task = new Task(req.body);
  //Task.save stores the info of the created object within the database
  await task.save();
  //Redirecting everything back to the main route of the server
  res.redirect('/');
});

//Turn is a generic name used to change the status of the status field on collection
router.get('/turn/:id', async (req, res, next) => {
  //Recieving the id of the document
  let { id } = req.params;
  //Finding the record on document to update
  const task = await Task.findById(id);
  //changing the current status you can use update or any other operation
  task.status = !task.status;
  await task.save();
  res.redirect('/');
});


router.get('/edit/:id', async (req, res, next) => {
  //Recieving the id of the document
  const { id } = req.params;
  const task = await Task.findById(req.params.id);
  console.log(task)
  //Rendering the edit ejs
  res.render('edit', { task });
});

//Enabling the edit propierty
router.post('/edit/:id', async (req, res, next) => {
  //Recieving the id of the document
  const { id } = req.params;
  //Finding the record on document to update and update the document
  await Task.update({_id: id}, req.body);
  res.redirect('/');
});

//Validate whether you should delete a document
router.get('/delete/:id', async (req, res, next) => {
  //req.params devuelve toda la informacion   
  let { id } = req.params;
  //Indicando que eliminara el id seleccionado
  await Task.remove({_id: id});
  //Redirecting everything back to the main route of the server
  res.redirect('/');
});


module.exports = router;