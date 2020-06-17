import React from 'react';
import { Appbar, Avatar, Button, Card, Divider, List, ActivityIndicator, Menu } from 'react-native-paper';
import { View, ScrollView, Text } from 'react-native';
import { AsyncStorage } from 'react-native';
// import { StackActions, useFocusEffect } from '@react-navigation/native';
import styles from '../assets/stylesheet/General'
import axios from 'axios';
import moment from 'moment'
// import { NavigationEvents } from '@react-navigation/native'

const proxy = 'https://us-central1-avaliatec-80c1a.cloudfunctions.net/api'

const IconForm = props => <Avatar.Icon {...props} icon="dots-horizontal" />
const IconStudent = props => <List.Icon {...props} icon="school" />
const TextFill = 'Preencher'



export default class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            menuVisible: false,
            data: null,
            theme: null,
        };
    }

    async _getAsyncStorageItem(key) {
        return AsyncStorage.getItem(key).then((value) => {
            this.setState({ [(key).toLowerCase()]: value })
        })
    }

    _getForms() {
        this._getAsyncStorageItem('EMAIL').then(() => {
            this._getAsyncStorageItem('NAME').then(() => {
                const find = {
                    teacher: this.state.name,
                }

                axios.post(proxy + '/user/unfilled', find)
                    .then(res => {
                        this.setState({
                            data: res.data
                        })
                    })
                    .catch(err => console.log(err))
                    .then(axios.get(proxy + '/theme')
                        .then(res => {
                            this.setState({
                                theme: res.data
                            })
                        }))
                    .catch(err => console.log(err))
            })
                .catch(err => console.log(err))
        })
    }

    showCards(themeTitle) {
        if (this.state.theme) {
            var themeObject = this.state.theme.find((title, index) =>
                title.theme.indexOf(themeTitle) > -1
            )

            if (themeObject) {
                return (
                    themeObject.members.map((member, index) => {
                        if (member) {
                            return (
                                <List.Item
                                    title={member ? (member) : ('Nenhum membro')}
                                    left={IconStudent}
                                />
                            )
                        }
                    })
                )
            }
        } else {
            return (
                <ActivityIndicator style={styles.defaultMarginVertical} size='large' animating={true} />
            )
        }
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', e => {
            this.setState({ data: null, theme: null })
            this._getForms()
        });
    }

    _openMenu() {
        this.setState({ menuVisible: true })
    }

    _closeMenu() {
        this.setState({ menuVisible: false })
    }

    _logout = async () => {
        try {
            await AsyncStorage.setItem('EMAIL', '');
            await AsyncStorage.setItem('NAME', '');
        } catch (error) {
            console.log(error.message);
        }
    }

    _navigateForm(form) {
        this.props.navigation.navigate('Form', {
            form: form,
            teacher: this.state.name,
        })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Appbar.Header style={styles.appBar}>
                    <Appbar.Content
                        title='Avaliatec'
                        onPress={() => console.log(this.state)}
                    />
                    <Menu
                        visible={this.state.menuVisible}
                        onDismiss={() => this._closeMenu()}
                        anchor={
                            <Appbar.Action icon="dots-vertical" onPress={() => this._openMenu()} />
                        }
                    >
                        <Menu.Item onPress={() => this._logout()} title="Sair" />
                    </Menu>
                </Appbar.Header>

                <ScrollView style={styles.container} contentContainerStyle={styles.screen}>

                    {
                        this.state.data ? (
                            this.state.data.map((form) => (
                                <Card style={[styles.card, styles.spacer]}>
                                    <Card.Title
                                        title={form.theme}
                                        subtitle={moment(form.date + 'T' + form.time).format("DD/MM/YYYY HH:mm")}
                                        left={IconForm}
                                    />
                                    <Divider />
                                    <Card.Content style={styles.defaultHalfPaddingHorizontal}>
                                        {this.showCards(form.theme)}
                                    </Card.Content>
                                    <Divider />
                                    <Card.Actions style={styles.cardActionsRight}>
                                        <Text></Text>
                                        <Button
                                            disabled={moment().isAfter(form.date + 'T' + form.time) ? false : true}
                                            onPress={() => this._navigateForm(form)}
                                        >
                                            {TextFill}
                                        </Button>
                                    </Card.Actions>
                                </Card>
                            ))
                        ) : (
                                <ActivityIndicator style={styles.defaultMarginVertical} size='large' animating={true} />
                            )
                    }
                    {/* <Button mode='contained' onPress={() => console.log(this.state.data)} style={{ marginBottom: 12, borderRadius: 12 }}>
                        Print Data
                </Button>
                    <Button mode='contained' onPress={() => console.log(new Date().toISOString())} style={{ marginBottom: 12, borderRadius: 12 }}>
                        Print Data
                </Button>
                    {this.state.soyVisible === true ?
                        <>
                            <Button mode='contained' onPress={() => setSoyVisible(false)} style={{ marginBottom: 12, borderRadius: 12 }}>
                                Vanish
                        </Button>
                        </>
                        :
                        <></>
                    } */}
                </ScrollView>
            </View>
        )
    }
}
