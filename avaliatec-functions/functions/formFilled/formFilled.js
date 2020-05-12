const { db, admin } = require('../util/admin');
const functions = require('firebase-functions');

exports.formFilled = (req, res) => {

    const formFilled = {
        note: req.body.note,
        formId: req.body.formId,
        teacher: req.body.teacher
    };
    let formId;
    return db.collection('formsFilled')
        .add(formFilled)
        .then((data) => {
            formId = data.id;
        })
        .then(() => {
            const addFormFilled = {
                note: formFilled.note,
                teacher: formFilled.teacher,
                formId: formFilled.formId
            }
            return db.doc(`/formsFilled/${formId}`).set(addFormFilled), res.status(200).json({ Sucess: 'Formulário preenchido com sucesso' });
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        })
}

exports.getFormsFilled = (req, res) => {
    const find = {
        teacher: req.body.teacher
    }
    admin
        .firestore()
        .collection('formsFilled').where('teacher', '==', find.teacher)
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
