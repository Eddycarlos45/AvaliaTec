const functions = require('firebase-functions');
const app = require('express')();

const { signup, login } = require('./user/userActivity');
const { createTheme } = require('./theme/themes');
const { createForm, getForms } = require('./form/forms')

//Users route
app.post('/signup', signup);
app.post('/login', login);
app.post('/theme', createTheme);
app.post('/form', createForm);
app.get('/form', getForms);

exports.api = functions.https.onRequest(app); 