const functions = require('firebase-functions');
const app = require('express')();

const { signup, login, getUsers } = require('./user/userActivity');
const { createTheme, getThemes, deleteTheme, updateTheme } = require('./theme/themes');
const { createForm, getForms, deleteForm, updateForm } = require('./form/forms');
const { formFilled, getFormsFilled } = require('./formFilled/formFilled');

//Users route
app.post('/signup', signup);
app.post('/login', login);
app.post('/theme', createTheme);
app.get('/theme', getThemes);
app.delete('/theme', deleteTheme);
app.put('/theme', updateTheme);
app.post('/form', createForm);
app.get('/form', getForms);
app.delete('/form', deleteForm);
app.put('/form', updateForm);
app.get('/users', getUsers);
app.post('/filled', formFilled);
app.post('/user/filled', getFormsFilled);

exports.api = functions.https.onRequest(app); 