const { db, admin } = require('../util/admin');
const functions = require('firebase-functions');
const { validateForm } = require('../util/validators');

exports.createForm = (req, res) => {

	const newForm = {
		course: req.body.course,
		criteria: req.body.criteria,
		teachers: req.body.teachers,
		theme: req.body.theme
	};

	const { valid, errosForm } = validateForm(newForm);

	let formId;

	if (!valid) return res.status(400).json(errosForm);
	else {
		return db.collection('forms')
			.add(newForm)
			.then((data) => {
				formId = data.id;
			})
			.then(() => {
				const addForm = {
					course: newForm.course,
					criteria: newForm.criteria,
					teachers: newForm.teachers,
					theme: newForm.theme,
					formId
				}
				return db.doc(`/forms/${formId}`).set(addForm), res.status(200).json({ Sucess: 'Formulário criado com sucesso' });
			})
			.catch((err) => {
				console.error(err);
				return res.status(500).json({ error: err.code });
			})
	}
}

exports.getForms = (req, res) => {
	admin
		.firestore()
		.collection('forms')
		.get()
		.then((data) => {
			let forms = [];
			data.forEach((doc) => {
				forms.push(doc.data());
			});
			return res.json(forms);
		})
		.catch((err) => console.error(err));
};

exports.deleteForm = (req, res) => {

	const id = {
		formId: req.body.formId
	}
	return db.collection('forms').doc(id.formId).delete()
		.then(() => { return res.status(200).json({ res: 'Deletado com Sucesso' }) }
		)
		.catch((err) => {
			console.error(err);
			return res.status(500).json({ error: err.code });
		})
}

exports.updateForm = (req, res) => {

	const updateForm = {
		course: req.body.course,
		criteria: req.body.criteria,
		teachers: req.body.teachers,
		theme: req.body.theme,
		formId: req.body.formId
	}
	return db.collection('forms').doc(updateForm.formId).update({
		course: updateForm.course,
		criteria: updateForm.criteria,
		teachers: updateForm.teachers,
		theme: updateForm.theme
	}).then(() => { return res.status(200).json({ res: 'Atualizado com Sucesso' }) })
		.catch((err) => {
			console.error(err);
			return res.status(500).json({ error: err.code });
		})
}

exports.getFormsUnfilled = (req, res) => {
    const find = {
        teacher: req.body.teacher
    }
    admin
        .firestore()
        .collection('forms').where('teachers', 'array-contains', find.teacher)
        .get()
        .then((data) => {
            let forms = [];
            data.forEach((doc) => {
                forms.push(doc.data());
            });
            return res.json(forms);
        })
        .catch((err) => console.error(err));
};