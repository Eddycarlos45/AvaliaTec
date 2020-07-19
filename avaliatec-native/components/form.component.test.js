import React, { useState } from 'react';
import { Appbar, Avatar, Button, Card, Title, Paragraph, Divider, List, ToggleButton, TextInput, Portal, Dialog } from 'react-native-paper';
import { View, ScrollView, Text, AsyncStorage } from 'react-native';
import styles from '../assets/stylesheet/General'
import axios from 'axios';

const Header = props => <Avatar.Icon {...props} icon="tag-outline" />
const Items = props => <Avatar.Icon {...props} icon="format-list-bulleted" />
const Comment = props => <Avatar.Icon {...props} icon="comment" />
const StringFill = 'Preencher'
const StringFilled = 'Preenchido'
const axiosFillForm = 'https://us-central1-avaliatec-80c1a.cloudfunctions.net/api/filled'
const axiosUpdateForm = 'https://us-central1-avaliatec-80c1a.cloudfunctions.net/api/form'

const strings = {
    error: 'Algo deu errado',
    action1: 'Ocorreu um problema ao carregar as avaliações. Por favor retorne à tela inicial e abra o formulário novamente.',
    action2: 'Existem uma ou mais questões não preenchidas. Por favor avalie todas as questões existentes no formulário.',
    action3: 'Não foi possível enviar o formulário. Por favor tente novamente mais tarde.',
    submitTitle: 'Deseja enviar o formulário?',
    submitDescription: 'Não será mais possível alterar esse formulário depois de enviado.',
    submitButton: 'Enviar',
    editButton: 'Editar',
    submitingTitle: 'Quase lá...',
    submitingDescription: 'O formulário está sendo enviado.',
    submitingButton: 'Enviando',
    submitedTitle: 'Tudo pronto',
    submitedDescription: 'O formulário foi enviado com sucesso.',
    finishButton: 'Finalizar',
    goBackTitle: 'Tem certeza?',
    goBackDescription: 'Se você voltar agora todos os campos preenchidos serão perdidos.',
    yesButton: 'Sim',
    noButton: 'Não',
    criteria: 'Questões',
    comment: 'Comentário',
}

export default class FormScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visibleDialogSend: false,
            visibleDialogBack: false,
            visibleDialogError: false,
            visibleDialogSending: false,
            form: this.props.route.params.form,
            formId: this.props.route.params.form.formId,
            theme: this.props.route.params.form.theme,
            comment: '',
            criteria: [],
            teacher: this.props.route.params.teacher,
            sending: true,
            errorMessage: strings.error,
            errorAction: strings.action1,
        };
    }

    componentDidMount() {
        try {
            if (this.state.form.criteria) {
                let newArray = []
                this.state.form.criteria.map((criteria, index) => {
                    let newObject = {
                        'index': index,
                        'score': 0,
                        'criteria': criteria.type,
                        'weight': criteria.weight
                    }

                    newArray.push(newObject)
                })
                this.setState({
                    criteria: newArray
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    _showDialogSend() {
        this.setState({ visibleDialogSend: true })
    }

    _hideDialogSend() {
        this.setState({ visibleDialogSend: false })
    }

    _showDialogSending() {
        this.setState({ visibleDialogSending: true })
    }

    _hideDialogSending() {
        this.setState({ visibleDialogSending: false })
    }

    _showDialogBack() {
        this.setState({ visibleDialogBack: true })
    }

    _hideDialogBack() {
        this.setState({ visibleDialogBack: false })
    }

    _showDialogError() {
        this.setState({ visibleDialogError: true })
    }

    _hideDialogError() {
        this.setState({ visibleDialogError: false })
    }

    _handleNavigationBack() {
        this.props.navigation.goBack();
    };

    _confirmSend() {
        this.state({ confirmSend: true })
    }

    _validateFields() {
        try {
            let errorCode = 0

            if (this.state.criteria == []) {
                errorCode = 1
            } else {
                this.state.criteria.map((criteria, index) => {
                    if (criteria.criteria != "") {
                        if (criteria.score < 1 || criteria.score > 5 || criteria.score == null) {
                            errorCode = 2
                        }
                    }
                })
            }

            if (errorCode == 2) {
                this.setState({ errorAction: strings.action2 })
                this._showDialogError()
            } else if (errorCode == 1) {
                this.setState({ errorAction: strings.action1 })
                this._showDialogError()
            } else if (errorCode == 0) {
                this._showDialogSend()
            }
        } catch (e) {
            console.log(e)
        }
    }

    _triggerSend() {
        this.setState({ sending: true })

        this._hideDialogSend()
        this._showDialogSending()

        // SUBMIT FORM
        try {
            this._sendForm()
        } catch (e) {
            console.log(e)
            this.setState({ errorAction: strings.action3 })
            this._hideDialogSending()
            this._showDialogError()
            this.setState({ sending: false })
        }
    }

    _sendForm() {
        let filled = {
            formId: this.state.formId,
            theme: this.state.theme,
            score: {
                comment: this.state.comment,
                criteria: this.state.criteria,
                teacher: this.state.teacher
            },
        }

        axios.post(axiosFillForm, filled)
            .then(res => {
                this._sendUpdate()
            })
            .catch(err => {
                console.log('FILL FAIL')
                this.setState({ errorAction: strings.action3 })
                this._hideDialogSending()
                this._showDialogError()
                this.setState({ sending: false })
            })
    }

    _sendUpdate() {
        let formUpdated = this.state.form
        let teacherIndex = -1

        if (formUpdated) {
            formUpdated.teachers.find((teacher, index) => {
                if (teacher.name.indexOf(this.state.teacher) > -1) {
                    teacherIndex = index
                }
            })
            if (teacherIndex > -1) {
                formUpdated.teachers[teacherIndex] = {
                    filled: true,
                    name: this.state.teacher
                }

                axios.put(axiosUpdateForm, formUpdated)
                    .then(res => {
                        // FINAL DESTINATION
                        this.setState({ sending: false })
                    })
                    .catch(err => {
                        console.log('UPDATE FAIL')
                        this.setState({ errorAction: strings.action3 })
                        this._hideDialogSending()
                        this._showDialogError()
                        this.setState({ sending: false })
                    })
            } else {
                this.setState({ errorAction: strings.action3 })
                this._hideDialogSending()
                this._showDialogError()
                this.setState({ sending: false })
            }
        }
    }

    showCriteria(criteriaList) {
        if (criteriaList) {
            return (
                criteriaList.map((criteria, index) => {
                    if (criteria.type) {
                        return (
                            <View style={styles.spacer}>
                                <Text style={styles.spacer}>{criteria.type}</Text>
                                <ToggleButton.Row
                                    onValueChange={
                                        value => {
                                            let criteriaCopy = JSON.parse(JSON.stringify(this.state.criteria))
                                            //make changes to ingredients
                                            criteriaCopy[index] = {
                                                'index': index,
                                                'score': value,
                                                'criteria': criteria.type,
                                                'weight': criteria.weight
                                            }
                                            this.setState({
                                                criteria: criteriaCopy
                                            })
                                        }
                                    }
                                    value={
                                        this.state.criteria[index] ? this.state.criteria[index].score : 0
                                    }
                                >
                                    <ToggleButton icon="numeric-1" value={1} style={{ flex: 1 }} />
                                    <ToggleButton icon="numeric-2" value={2} style={{ flex: 1 }} />
                                    <ToggleButton icon="numeric-3" value={3} style={{ flex: 1 }} />
                                    <ToggleButton icon="numeric-4" value={4} style={{ flex: 1 }} />
                                    <ToggleButton icon="numeric-5" value={5} style={{ flex: 1 }} />
                                </ToggleButton.Row>
                            </View >
                        )
                    }
                })
            )
        }
        return (
            <ActivityIndicator size='large' animating={true} />
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Appbar.Header style={styles.appBar}>
                    <Appbar.BackAction
                        onPress={() => this._showDialogBack()}
                    />
                    <Appbar.Content
                        title="Avaliatec"
                    />
                    <Appbar.Action icon="send" onPress={() => this._validateFields()} />

                    {/* CONFIRM SUBMIT */}
                    <Portal>
                        <Dialog
                            visible={this.state.visibleDialogSend}
                            dismissable={false}
                        >
                            <Dialog.Title>{strings.submitTitle}</Dialog.Title>
                            <Dialog.Content>
                                <Paragraph>{strings.submitDescription}</Paragraph>
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button
                                    mode='text'
                                    style={styles.defaultMarginHorizontal}
                                    onPress={() => this._hideDialogSend()}
                                >
                                    {strings.editButton}
                                </Button>
                                <Button
                                    mode='text'
                                    onPress={() => this._triggerSend()}
                                >
                                    {strings.submitButton}
                                </Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
                    {/* CONFIRM GO BACK */}
                    <Portal>
                        <Dialog
                            visible={this.state.visibleDialogBack}
                            dismissable={false}
                        >
                            <Dialog.Title>{strings.goBackTitle}</Dialog.Title>
                            <Dialog.Content>
                                <Paragraph>{strings.goBackDescription}</Paragraph>
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button
                                    mode='text'
                                    style={styles.defaultMarginHorizontal}
                                    onPress={() => this._hideDialogBack()}
                                >
                                    {strings.noButton}
                                </Button>
                                <Button
                                    mode='text'
                                    onPress={() => this._handleNavigationBack()}
                                >
                                    {strings.yesButton}
                                </Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
                    {/* SUBMITING */}
                    <Portal>
                        <Dialog
                            visible={this.state.visibleDialogSending}
                            dismissable={false}
                        >
                            <Dialog.Title>{this.state.sending ? strings.submitingTitle : strings.submitedTitle}</Dialog.Title>
                            <Dialog.Content>
                                <Paragraph>{this.state.sending ? strings.submitingDescription : strings.submitedDescription}</Paragraph>
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button
                                    mode='text'
                                    onPress={() => this._handleNavigationBack()}
                                    disabled={this.state.sending ? true : false}
                                    loading={this.state.sending ? true : false}
                                >
                                    {this.state.sending ? strings.submitingButton : strings.finishButton}
                                </Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
                    {/* SHOW ERROR MESSAGE */}
                    <Portal>
                        <Dialog
                            visible={this.state.visibleDialogError}
                            onDismiss={() => this._hideDialogError()}>
                            <Dialog.Title>{this.state.errorMessage}</Dialog.Title>
                            <Dialog.Content>
                                <Paragraph>{this.state.errorAction}</Paragraph>
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button mode='text' onPress={() => this._hideDialogError()}>{strings.editButton}</Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
                </Appbar.Header>

                <ScrollView style={styles.container} contentContainerStyle={styles.screen}>

                    <Card style={[styles.card, styles.spacer]}>
                        <Card.Title title={this.state.form.theme} left={Header} />
                    </Card>

                    <Card style={[styles.card, styles.spacer]}>
                        <Card.Title title={strings.criteria} left={Items} />
                        <Divider />
                        <Card.Content style={[styles.defaultPaddingHorizontal, { paddingBottom: 0, paddingTop: 12 }]}>
                            {
                                this.showCriteria(this.state.form.criteria)
                            }
                        </Card.Content>
                    </Card>

                    <Card style={[styles.card, styles.spacer]}>
                        <Card.Title title={strings.comment} left={Comment} />
                        <Divider />
                        <Card.Content style={[styles.defaultPaddingHorizontal, styles.defaultPaddingVertical]}>
                            <TextInput
                                label={strings.comment}
                                value={this.state.comment}
                                onChangeText={value => this.setState({ comment: value })}
                                mode='outlined'
                                multiline={true}
                            />
                        </Card.Content>
                    </Card>
                    {/* <Button onPress={() => console.log(this.state.form)}>Print form</Button> */}
                </ScrollView>
            </View >
        );
    }
};