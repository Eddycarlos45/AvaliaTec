const { db } = require('../util/admin');
const firebase = require('firebase');
const { validateTheme } = require('../util/validators');

exports.createTheme = (req, res) => {

	const newTheme = {
		theme: req.body.theme,
		members: req.body.members
	};

	const { valid, errorsTheme } = validateTheme(newTheme);
	let groupId;
	if (!valid) {
		return res.status(400).json(errorsTheme);
	} else {
		return db.collection('themes')
			.add(newTheme)
			.then((data) => {
				groupId = data.id;
			})
			.then(() => {
				const addTheme = {
					theme: newTheme.theme,
					members: newTheme.members,
					groupId
				}
				return db.doc(`/themes/${groupId}`).set(addTheme);
			})
			.catch((err) => {
				console.error(err);
				return res.status(500).json({ error: err.code });
			})
	}
}
