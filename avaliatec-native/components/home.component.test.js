import React from 'react';
import { Appbar, Avatar, Button, Card, Divider, List, ActivityIndicator, Menu } from 'react-native-paper';
import { View, ScrollView } from 'react-native';
import { AsyncStorage } from 'react-native';
// import { StackActions, useFocusEffect } from '@react-navigation/native';
import styles from '../assets/stylesheet/General'
import axios from 'axios';

const proxy = 'https://us-central1-avaliatec-80c1a.cloudfunctions.net/api'

const IconForm = props => <Avatar.Icon {...props} icon="dots-horizontal" />
const IconStudent = props => <List.Icon {...props} icon="school" />
const TextFill = 'Preencher'

export default class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            menuVisible: false,
            cardsLoading: true,
            membersLoading: true,
            data: null,
            theme: null
        };
    }

    componentDidMount() {
        
        try {
            const find = {
                teacher: 'Filipe',
            }

            axios.post(proxy + '/user/unfilled', find)
                .then(res => {
                    this.setState({
                        data: res.data
                    })
                    // console.log(this.state.data)
                })
                .catch(err => console.log(err))
                .then(axios.get(proxy + '/theme')
                    .then(res => {
                        this.setState({
                            theme: res.data
                        })
                        // console.log(this.state.theme)

                        // console.log('#---')
                        // this.state.theme ? (
                        //     this.state.theme.map((file) => file.members.map(file2 => console.log(file2)))
                        // ) : (console.log('loading'))

                        // find the theme based on the map function that will load the components in the screen
                        // var chose = this.state.theme.find((title) =>
                        //     title.theme.indexOf('Plus Ultra!') > -1
                        // )
                        // console.log(chose)

                        // if (chose) {
                        //     chose.map((members) => console.log(members.member))
                        // }

                        // chose ? (
                        //     chose.members.map((member) => console.log(member))
                        // ) : (console.log('loading'))

                        // console.log(chose.members)

                    }))
                .catch(err => console.log(err));
            console.log('HOME MOUNTED')
        } catch {
            console.log('COMPONENT MOUNT FAIL')
        }




        // console.log(recentAvaluations)

    }

    showCards(themeTitle) {
        if (this.state.theme) {
            var themeObject = this.state.theme.find((title) =>
                title.theme.indexOf(themeTitle) > -1
            )

            if (themeObject) {
                return (
                    themeObject.members.map((member) => {
                        if (member) {
                            return (<List.Item
                                title={member ? (member) : ('Nenhum membro')}
                                left={IconStudent}
                            />)
                        }
                    })
                )
            }
        }

        themeObject ? (
            themeObject.members.map((member) => console.log(member + 'HORA'))
        ) : (console.log('loading'))

        return (
            <ActivityIndicator size='large' animating={true} />
        )
    }

    componentDidUpdate() {
        try {

            console.log('HOME UPDATED')
        } catch {
            console.log('COMPONENT UPDATE FAIL')
        }
    }

    // const [firstRun, setFirstRun] = React.useState('true');
    // const [soyVisible, setSoyVisible] = React.useState(true);
    // const[menuVisible, setMenuVisible] = React.useState(false);

    _openMenu() {
        this.setState({ menuVisible: true })
    }

    _closeMenu() {
        this.setState({ menuVisible: false })
    }

    _logout = async () => {
        try {
            await AsyncStorage.setItem('USER', '');
            console.log('Estou desconectando')

        } catch (error) {
            // Error retrieving data
            console.log(error.message);
        }
    }

    _getEmailAddress = async () => {
        try {
            console.log(await AsyncStorage.getItem('USER'))
        } catch (error) {
            // Error retrieving data
            console.log(error.message);
        }
    }

    _navigateForm(form) {
        this.props.navigation.navigate('Form', {
            form: form
        })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Appbar.Header style={styles.appBar}>
                    <Appbar.Content
                        title='Avaliatec'
                        onPress={() => _getEmailAddress()}
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
                {/* <Provider>
                    <View
                        style={{
                            paddingTop: 50,
                            flexDirection: 'row',
                            justifyContent: 'center'
                        }}>

                    </View>
                </Provider> */}
                <ScrollView style={styles.container} contentContainerStyle={styles.screen}>

                    {
                        this.state.data ? (
                            this.state.data.map((form) => (
                                <Card style={[styles.card, styles.spacer]}>
                                    <Card.Title title={form.theme} left={IconForm} />
                                    <Divider />
                                    <Card.Content style={styles.defaultHalfPaddingHorizontal}>
                                        {this.showCards(form.theme)}
                                    </Card.Content>
                                    <Divider />
                                    <Card.Actions style={styles.cardActionsRight}>
                                        <Button disabled={false} onPress={() => this._navigateForm(form)}>{TextFill}</Button>
                                    </Card.Actions>
                                </Card>
                            ))
                        ) : (
                                console.log('teste222')
                            )
                    }



                    {/* <Card style={[styles.card, styles.spacer]}>
                        <Card.Title title="Avaliação 1" subtitle="01/02/2020" left={Pending} />
                        <Divider />
                        <Card.Content style={styles.defaultHalfPaddingHorizontal}>
                            <List.Item
                                title="John Doe"
                                left={Student}
                            />
                            <List.Item
                                title="Jane Doe"
                                left={Student}
                            />
                            <List.Item
                                title="Johnny Appleseed"
                                left={Student}
                            />
                            <List.Item
                                title="Jane Appleseed"
                                left={Student}
                            />
                        </Card.Content>
                        <Divider />
                        <Card.Actions style={styles.cardActionsRight}>
                            <Button disabled={false}>{StringFill}</Button>
                        </Card.Actions>
                    </Card> */}

                    {/* <Card style={[styles.card, styles.spacer]}>
                        <Card.Title title="Avaliação 2" subtitle="02/03/2020" left={Done} />
                        <Divider />
                        <Card.Content style={styles.defaultHalfPaddingHorizontal}>
                            <List.Item
                                title="John Doe"
                                left={Student}
                            />
                            <List.Item
                                title="Jane Doe"
                                left={Student}
                            />
                            <List.Item
                                title="Johnny Appleseed"
                                left={Student}
                            />
                            <List.Item
                                title="Jane Appleseed"
                                left={Student}
                            />
                        </Card.Content>
                        <Divider />
                        <Card.Actions style={styles.cardActionsRight}>
                            <Button disabled={true}>{StringFilled}</Button>
                        </Card.Actions>
                    </Card> */}
                    {
                        this.state.data ?
                            <>
                            </>
                            :
                            <>
                                <ActivityIndicator size='large' animating={true} />
                            </>
                    }
                    <Button mode='contained' onPress={() => this.props.navigation.navigate('Form')} style={{ marginBottom: 12, borderRadius: 12 }}>
                        Go to next screen
                </Button>
                    {this.state.soyVisible === true ?
                        <>
                            <Button mode='contained' onPress={() => setSoyVisible(false)} style={{ marginBottom: 12, borderRadius: 12 }}>
                                Vanish
                        </Button>
                        </>
                        :
                        <></>
                    }



                </ScrollView>
            </View>
        )
    }
}