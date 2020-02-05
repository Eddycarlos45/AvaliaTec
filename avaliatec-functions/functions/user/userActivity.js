const { db } = require('../util/admin');
const config = require('../util/config')
const firebase = require('firebase');
firebase.initializeApp(config)

const { validateSignupData } = require('../util/validators');

exports.signup = (req, res) => {

	const newUser = {
		email: req.body.email,
		password: req.body.password,
		confirmPassword: req.body.confirmPassword,
		userLogin: req.body.userLogin,
		userName: req.body.userName,
		course: req.body.course
	};
	const { valid, errors } = validateSignupData(newUser);

	if (!valid) return res.status(400).json(errors);
	let token, userId;
	db.doc(`/users/${newUser.userLogin}`)
		.get()
		.then((doc) => {
			if (doc.exists) {
				return res.status(400).json({ userLogin: 'this userLogin is already taken' })
			} else {
				return firebase
					.auth()
					.createUserWithEmailAndPassword(newUser.email, newUser.password);
			}
		})
		.then((data) => {
			userId = data.user.uid;
			return data.user.getIdToken();
		})
		.then((idToken) => {
			token = idToken;
			const userCredentials = {
				userLogin: newUser.userLogin,
				email: newUser.email,
				userId,
				userName: newUser.userName,
				course: newUser.course
			};
			return db.doc(`/users/${newUser.userLogin}`).set(userCredentials);
		})
		.then(() => {
			return req.status(201).json({ token });
		})
		.catch((err) => {
			console.error(err);
			return res.status(500).json({ error: err.code });
		})
}

exports.login = (req, res) => {
	const user = {
		email: req.body.email,
		password: req.body.password
	};
	
	firebase.auth().signInWithEmailAndPassword(user.email, user.password)
		.then(data => {
			return data.user.getIdToken();
		})
		.then(token => {
			return res.json({ token });
		})
		.catch(err => {
			console.error(err);
			return res.status(500).json({ error: err.code });
		})
}