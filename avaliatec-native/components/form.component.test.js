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

export default class FormScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visibleDialogSend: false,
            visibleDialogBack: false,
            form: this.props.route.params.form,
            score: [],
            comment: '',
        };
    }

    componentDidMount() {
        try {
            AsyncStorage.getItem('USER', (err, item) => item == null ? this.setState({ teacher: 'null' }) : this.setState({ teacher: item }));
        } catch (e) {
            console.log('')
        }
    }

    _showDialogSend() {
        this.setState({ visibleDialogSend: true })
    }

    _hideDialogSend() {
        this.setState({ visibleDialogSend: false })
    }

    _showDialogBack() {
        this.setState({ visibleDialogBack: true })
    }

    _hideDialogBack() {
        this.setState({ visibleDialogBack: false })
    }

    _handleNavigationBack() {
        this.props.navigation.goBack();
    };

    _sendForm(filled) {
        axios.post(axiosFillForm, filled)
            .then(res => {
                console.log(filled)
                console.log('FILL SUCCESS')
            })
            .catch(err => {
                console.log('FILL FAIL')
            })
    }

    _handleSend() {
        let formFilled = {
            score: this.state.score,
            formId: this.state.form.formId,
            teacher: this.props.route.params.teacher,
            comment: this.state.comment
        }

        this._sendForm(formFilled)
    }

    showCriteria(criteriaList) {
        if (criteriaList) {
            return (
                criteriaList.map((score, index) => {
                    if (score.type) {
                        return (
                            <View style={styles.spacer}>
                                <Text style={styles.spacer}>{score.type}</Text>
                                <ToggleButton.Row
                                    onValueChange={
                                        value => {
                                            let scoreCopy = JSON.parse(JSON.stringify(this.state.score))
                                            //make changes to ingredients
                                            scoreCopy[index] = {
                                                note: value,
                                                weight: score.weight
                                            }
                                            this.setState({
                                                score: scoreCopy
                                            })
                                        }
                                    }
                                    value={this.state.score[index] ? this.state.score[index].note : 3}
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
                        onPress={() => this._handleNavigationBack()}
                    />
                    <Appbar.Content
                        title="Avaliatec"
                    />
                    <Appbar.Action icon="send" onPress={() => this._handleSend()} />
                    <Portal>
                        <Dialog
                            visible={this.state.visibleDialogSend}
                            onDismiss={() => this._hideDialogSend()}>
                            <Dialog.Title></Dialog.Title>
                            <Dialog.Content>
                                <Paragraph>This is simple dialog</Paragraph>
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button mode='text' onPress={() => this._hideDialogSend()} style={styles.defaultMarginHorizontal}>Voltar</Button>
                                <Button mode='text' onPress={() => this._hideDialogSend()}>Enviar</Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
                </Appbar.Header>
                <ScrollView style={styles.container} contentContainerStyle={styles.screen}>

                    <Card style={[styles.card, styles.spacer]}>
                        <Card.Title title={this.state.form.theme} left={Header} />
                    </Card>

                    <Card style={[styles.card, styles.spacer]}>
                        <Card.Title title="Critérios" left={Items} />
                        <Divider />
                        <Card.Content style={[styles.defaultPaddingHorizontal, { paddingBottom: 0, paddingTop: 12 }]}>

                            {
                                this.showCriteria(this.state.form.criteria)
                            }

                            {/* <View style={styles.spacer}>
                                <Text style={styles.spacer}>Critério 1</Text>
                                <ToggleButton.Row
                                    onValueChange={value => this.setState({ criteria: { ...this.setState.criteria, ["Criteria" + "1"]: value } })}
                                    value={this.state.criteria["Criteria" + "1"]}
                                >
                                    <ToggleButton icon="numeric-1" value={1} style={{ flex: 1 }} />
                                    <ToggleButton icon="numeric-2" value={2} style={{ flex: 1 }} />
                                    <ToggleButton icon="numeric-3" value={3} style={{ flex: 1 }} />
                                    <ToggleButton icon="numeric-4" value={4} style={{ flex: 1 }} />
                                    <ToggleButton icon="numeric-5" value={5} style={{ flex: 1 }} />
                                </ToggleButton.Row>
                                <Text>{this.state.criteria["Criteria" + "1"]}</Text>
                            </View>

                            <View style={styles.spacer}>
                                <Text style={styles.spacer}>Critério 2</Text>
                                <ToggleButton.Row
                                    onValueChange={value => this.setState({ item2: value })}
                                    value={this.state.item2}
                                >
                                    <ToggleButton icon="numeric-1" value="one" style={{ flex: 1 }} />
                                    <ToggleButton icon="numeric-2" value="two" style={{ flex: 1 }} />
                                    <ToggleButton icon="numeric-3" value="three" style={{ flex: 1 }} />
                                    <ToggleButton icon="numeric-4" value="four" style={{ flex: 1 }} />
                                    <ToggleButton icon="numeric-5" value="five" style={{ flex: 1 }} />
                                </ToggleButton.Row>
                            </View>

                            <View style={styles.spacer}>
                                <Text style={styles.spacer}>Critério 3</Text>
                                <ToggleButton.Row
                                    onValueChange={value => this.setState({ item3: value })}
                                    value={this.state.item3}
                                >
                                    <ToggleButton icon="numeric-1" value="one" style={{ flex: 1 }} />
                                    <ToggleButton icon="numeric-2" value="two" style={{ flex: 1 }} />
                                    <ToggleButton icon="numeric-3" value="three" style={{ flex: 1 }} />
                                    <ToggleButton icon="numeric-4" value="four" style={{ flex: 1 }} />
                                    <ToggleButton icon="numeric-5" value="five" style={{ flex: 1 }} />
                                </ToggleButton.Row>
                            </View> */}
                        </Card.Content>
                    </Card>

                    <Card style={[styles.card, styles.spacer]}>
                        <Card.Title title="Comentário" left={Comment} />
                        <Divider />
                        <Card.Content style={[styles.defaultPaddingHorizontal, styles.defaultPaddingVertical]}>
                            <TextInput
                                label='Comentários'
                                value={this.state.comment}
                                onChangeText={value => this.setState({ comment: value })}
                                mode='outlined'
                                multiline={true}
                            />
                        </Card.Content>
                    </Card>

                    <Button mode='contained' onPress={() => console.log(this.state)} style={{ marginBottom: 12, borderRadius: 12 }}>
                        Show states
                        </Button>
                    <Button mode='contained' onPress={() => console.log(this.state.score)} style={{ marginBottom: 12, borderRadius: 12 }}>
                        Show states for criteria
                        </Button>


                </ScrollView>
            </View >
        );
    }
};