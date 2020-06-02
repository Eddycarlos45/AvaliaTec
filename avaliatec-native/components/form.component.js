import React, { useState } from 'react';
import { Appbar, Avatar, Button, Card, Title, Paragraph, Divider, List, ToggleButton, TextInput, Portal, Dialog } from 'react-native-paper';
import { View, ScrollView, Text } from 'react-native';
import styles from '../assets/stylesheet/General'
import axios from 'axios';

const Header = props => <Avatar.Icon {...props} icon="tag-outline" />
const Items = props => <Avatar.Icon {...props} icon="format-list-bulleted" />
const Comment = props => <Avatar.Icon {...props} icon="comment" />
const StringFill = 'Preencher'
const StringFilled = 'Preenchido'
const proxy = 'https://us-central1-avaliatec-80c1a.cloudfunctions.net/api'

var data = {
    content: {
        name: "Test",
        age: 24
    },
    dialog: {
        title: [
            {
                send: "Send title",
                return: "Return title"
            }
        ],
        content: [
            {
                send: "Send content",
                return: "Return content"
            }
        ]
    },
};

export const FormScreen = ({ navigation }) => {

    const [title, setTitle] = useState('Avaliação 1')
    const [date, setDate] = useState('01/02/2020')
    const [item1, setItem1] = useState('')
    const [item2, setItem2] = useState('')
    const [item3, setItem3] = useState('')
    const [comment, setComment] = useState('')

    const [dialogVisibility, setDialogVisibility] = useState(false)

    _showDialog = () => {
        setDialogVisibility(true)
    }

    _hideDialog = () => {
        setDialogVisibility(false)
    }

    const navigateBack = () => {
        navigation.goBack();
    };

    // componentDidMount() {
    //     axios.get(proxy + '/theme')
    //         .then(res => {
    //             this.setState({
    //                 themes: res.data
    //             })
    //             console.log(this.state.themes)
    //         })
    //         .catch(err => console.log(err))
    //         .then(axios.get(proxy + '/users')
    //             .then(res => {
    //                 this.setState({
    //                     listTeachers: res.data
    //                 })
    //             }))
    //         .catch(err => console.log(err));
    // }

    return (
        <View style={{ flex: 1 }}>
            <Appbar.Header style={styles.appBar}>
                <Appbar.BackAction
                    onPress={() => navigateBack()}
                />
                <Appbar.Content
                    title="Avaliatec"
                />
                <Appbar.Action icon="send" onPress={() => _showDialog()} />
                <Portal>
                    <Dialog
                        visible={dialogVisibility}
                        onDismiss={() => _hideDialog()}>
                        <Dialog.Title></Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>This is simple dialog</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button mode='text' onPress={() => _hideDialog()} style={styles.defaultMarginHorizontal}>Voltar</Button>
                            <Button mode='text' onPress={() => _hideDialog()}>Enviar</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </Appbar.Header>
            <ScrollView style={styles.container} contentContainerStyle={styles.screen}>

                <Card style={[styles.card, styles.spacer]}>
                    <Card.Title title={title} subtitle={date} left={Header} />
                </Card>

                <Card style={[styles.card, styles.spacer]}>
                    <Card.Title title="Critérios" left={Items} />
                    <Divider />
                    <Card.Content style={[styles.defaultPaddingHorizontal, { paddingBottom: 0, paddingTop: 12 }]}>

                        <View style={styles.spacer}>
                            <Text style={styles.spacer}>Critério 1</Text>
                            <ToggleButton.Row
                                onValueChange={value => setItem1(value)}
                                value={item1}
                            >
                                <ToggleButton icon="numeric-1" value="one" style={{ flex: 1 }} />
                                <ToggleButton icon="numeric-2" value="two" style={{ flex: 1 }} />
                                <ToggleButton icon="numeric-3" value="three" style={{ flex: 1 }} />
                                <ToggleButton icon="numeric-4" value="four" style={{ flex: 1 }} />
                                <ToggleButton icon="numeric-5" value="five" style={{ flex: 1 }} />
                            </ToggleButton.Row>
                        </View>

                        <View style={styles.spacer}>
                            <Text style={styles.spacer}>Critério 2</Text>
                            <ToggleButton.Row
                                onValueChange={value => setItem2(value)}
                                value={item2}
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
                                onValueChange={value => setItem3(value)}
                                value={item3}
                            >
                                <ToggleButton icon="numeric-1" value="one" style={{ flex: 1 }} />
                                <ToggleButton icon="numeric-2" value="two" style={{ flex: 1 }} />
                                <ToggleButton icon="numeric-3" value="three" style={{ flex: 1 }} />
                                <ToggleButton icon="numeric-4" value="four" style={{ flex: 1 }} />
                                <ToggleButton icon="numeric-5" value="five" style={{ flex: 1 }} />
                            </ToggleButton.Row>
                        </View>
                    </Card.Content>
                </Card>

                <Card style={[styles.card, styles.spacer]}>
                    <Card.Title title="Comentário" left={Comment} />
                    <Divider />
                    <Card.Content style={[styles.defaultPaddingHorizontal, styles.defaultPaddingVertical]}>
                        <TextInput
                            label='Comentários'
                            value={comment}
                            onChangeText={value => setComment(value)}
                            mode='outlined'
                            multiline={true}
                        />
                    </Card.Content>
                </Card>

            </ScrollView>
        </View>
    );
};