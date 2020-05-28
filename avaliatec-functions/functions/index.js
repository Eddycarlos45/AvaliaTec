const functions = require('firebase-functions');
const app = require('express')();

const { signup, login, getUsers, deleteUser, updateUser} = require('./user/userActivity');
const { createTheme, getThemes, deleteTheme, updateTheme } = require('./theme/themes');
const { createForm, getForms, deleteForm, updateForm, getFormsUnfilled } = require('./form/forms');
const { formFilled } = require('./formFilled/formFilled');

//Users route
app.post('/signup', signup);
app.put('/users', updateUser);
app.delete('/users', deleteUser);
app.post('/login', login);
app.get('/users', getUsers);
//Theme route
app.post('/theme', createTheme);
app.get('/theme', getThemes);
app.delete('/theme', deleteTheme);
app.put('/theme', updateTheme);
//Form route
app.post('/form', createForm);
app.get('/form', getForms);
app.delete('/form', deleteForm);
app.put('/form', updateForm);
app.post('/filled', formFilled);
app.post('/user/unfilled', getFormsUnfilled);

exports.api = functions.https.onRequest(app); 