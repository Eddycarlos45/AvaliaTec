const functions = require('firebase-functions');
const app = require('express')();

const { signup, login, getUsers } = require('./user/userActivity');
const { createTheme, getThemes, deleteTheme } = require('./theme/themes');
const { createForm, getForms, deleteForm } = require('./form/forms');

//Users route
app.post('/signup', signup);
app.post('/login', login);
app.post('/theme', createTheme);
app.get('/theme', getThemes);
app.delete('/theme', deleteTheme);
app.post('/form', createForm);
app.get('/form', getForms);
app.delete('/form', deleteForm);
app.get('/users', getUsers);


exports.api = functions.https.onRequest(app); 