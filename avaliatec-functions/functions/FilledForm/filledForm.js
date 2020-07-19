const { db, admin } = require('../util/admin');
const functions = require('firebase-functions');

exports.FilledForm = (req, res) => {

    const FilledForm = {
        score: [req.body.score],
        formId: req.body.formId,
        theme: req.body.theme
    };
    db.doc(`/FilledForms/${FilledForm.formId}`)
        .get()
        .then((doc) => {
            if (doc.exists) {
                let newAvaluation = db.collection('FilledForms').doc(FilledForm.formId);
                let arrUnion;
                return arrUnion = newAvaluation.update({
                    score: admin.firestore.FieldValue.arrayUnion(FilledForm.score[0])
                }).then(() => { return res.status(200).json({ res: 'Atualizado com Sucesso' }) })
                    .catch((err) => {
                        console.error(err);
                        return res.status(500).json({ error: err.code });
                    })
            } else {

                const addFormFilled = {
                    score: FilledForm.score,
                    formId: FilledForm.formId,
                    theme: FilledForm.theme
                }
                return db.doc(`/FilledForms/${FilledForm.formId}`).set(addFormFilled), res.status(200).json({ Sucess: 'Formulário preenchido com sucesso' });

            }
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
        .collection('FilledForms')
        .get()
        .then((data) => {
            let filledForms = [];
            data.forEach((doc) => {
                filledForms.push(doc.data());
            });
            return res.json(filledForms);
        })
        .catch((err) => console.error(err));
};
