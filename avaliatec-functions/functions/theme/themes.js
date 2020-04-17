const { db, admin } = require('../util/admin');
const firebase = require('firebase');
const { validateTheme } = require('../util/validators');

exports.createTheme = (req, res) => {

	const newTheme = {
		theme: req.body.theme,
		course: req.body.course,
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
					course: newTheme.course,
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

exports.getThemes = (req, res) => {
	admin
		.firestore()
		.collection('themes')
		.get()
		.then((data) => {
			let themes = [];
			data.forEach((doc) => {
				themes.push(doc.data());
			});
			return res.json(themes);
		})
		.catch((err) => console.error(err));
};

exports.deleteTheme = (req, res) => {

	const id = {
		groupId: req.body.groupId
	}
	return db.collection('themes').doc(id.groupId).delete()
		.then(() => { return res.status(200).json({ res: 'Deletado com Sucesso' }) }
		)
		.catch((err) => {
			console.error(err);
			return res.status(500).json({ error: err.code });
		})
}

exports.updateTheme = (req, res) => {

	const updateTheme = {
		theme: req.body.theme,
		course: req.body.course,
		members: req.body.members,
		groupId: req.body.groupId
	}
	return db.collection('themes').doc(updateTheme.groupId).update({
		theme: updateTheme.theme,
		course: updateTheme.course,
		members: updateTheme.members,
	}).then(() => { return res.status(200).json({ res: 'Atualizado com Sucesso' }) })
		.catch((err) => {
			console.error(err);
			return res.status(500).json({ error: err.code });
		})
}