const { db, admin } = require('../util/admin');
const config = require('../util/config')
const firebase = require('firebase');
firebase.initializeApp(config)

const { validateSignupData, validateLogin } = require('../util/validators');

exports.signup = (req, res) => {

	const newUser = {
		email: req.body.email,
		password: req.body.password,
		confirmPassword: req.body.confirmPassword,
		userName: req.body.userName,
		course: req.body.course,
		isAdmin: req.body.isAdmin
	};
	const { valid, errors } = validateSignupData(newUser);
	if (!valid) return res.status(400).json(errors);
	let token, userId;
	db.doc(`/users/${newUser.userName}`)
		.get()
		.then(() => {
			return firebase
				.auth()
				.createUserWithEmailAndPassword(newUser.email, newUser.password);
		})
		.then((data) => {
			userId = data.user.uid;
			return data.user.getIdToken();
		})
		.then((idToken) => {
			token = idToken;
			const userCredentials = {
				email: newUser.email,
				userId,
				userName: newUser.userName,
				course: newUser.course,
				isAdmin: newUser.isAdmin
			};
			db.doc(`/users/${userId}`).set(userCredentials);
			return res.status(200).json('Registration completed')
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
		password: req.body.password,
	};
	const { valid, errorsLogin } = validateLogin(user);

	if (!valid) return res.status(400).json(errorsLogin);

	firebase.auth().signInWithEmailAndPassword(user.email, user.password)
		.then(data => {
			return data.user.getIdToken();
		})
		.then(token => {
			return res.json({ token });
		})
		.catch(err => {
			console.error(err);
			if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
				return res.status(403).json({ general: 'Wrong credentials, please try again' })
			}
			return res.status(500).json({ error: err.code });
		})
}

exports.getUsers = (req, res) => {
	admin
		.firestore()
		.collection('users')
		.get()
		.then((data) => {
			let users = [];
			data.forEach((doc) => {
				users.push(doc.data());
			});
			return res.json(users);
		})
		.catch((err) => console.error(err));
};

exports.deleteUser = (req, res) => {

	const id = {
		userId: req.body.userId
	}
	return db.collection('users').doc(id.userId).delete()
		.then(() => { return res.status(200).json({ res: 'Deletado com Sucesso' }) }
		)
		.catch((err) => {
			console.error(err);
			return res.status(500).json({ error: err.code });
		})
}

exports.updateUser = (req, res) => {

	const updateUser = {
		course: req.body.course,
		userName: req.body.userName,
		userId: req.body.userId
	}
	return db.collection('users').doc(updateUser.userId).update({
		course: updateUser.course,
		userName: updateUser.userName
	}).then(() => { return res.status(200).json({ res: 'Atualizado com Sucesso' }) })
		.catch((err) => {
			console.error(err);
			return res.status(500).json({ error: err.code });
		})
}