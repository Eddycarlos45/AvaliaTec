const { db, admin } = require('../util/admin');
const functions = require('firebase-functions');

exports.FilledForm = (req, res) => {

    const FilledForm = {
        score: req.body.score,
        formId: req.body.formId
    };
    let formId;
    return db.collection('FilledForms')
        .add(FilledForm)
        .then((data) => {
            formId = data.id;
        })
        .then(() => {
            const addFormFilled = {
                score: FilledForm.score,
                formId: FilledForm.formId,
            }
            return db.doc(`/FilledForms/${formId}`).set(addFormFilled), res.status(200).json({ Sucess: 'Formulário preenchido com sucesso' });
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        })
}

exports.getFilledForms = (req, res) => {
    const find = {
        teacher: req.body.teacher
    }
    admin
        .firestore()
        .collection('FilledForms').where('teacher', '==', find.teacher)
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

exports.getFinishedForms = (req, res) => {
    admin
        .firestore()
        .collection()
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



