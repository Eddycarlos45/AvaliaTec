import React, { useState } from 'react';
import { Appbar, Avatar, Button, Card, Title, Paragraph, Divider, List, ToggleButton, TextInput } from 'react-native-paper';
import { View, ScrollView, Text } from 'react-native';
import styles from '../assets/stylesheet/General'
import axios from 'axios';

const Header = props => <Avatar.Icon {...props} icon="tag-outline" />
const Items = props => <Avatar.Icon {...props} icon="format-list-bulleted" />
const Comment = props => <Avatar.Icon {...props} icon="comment" />
const StringFill = 'Preencher'
const StringFilled = 'Preenchido'
const proxy = 'https://us-central1-avaliatec-80c1a.cloudfunctions.net/api'



export const FormScreen = ({ navigation }) => {

    const [item1, setItem1] = useState('')

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
            </Appbar.Header>
            <ScrollView style={styles.container} contentContainerStyle={styles.screen}>

                <Card style={[styles.card, styles.spacer]}>
                    <Card.Title title="Avaliação" subtitle="14/04/2014" left={Header} />
                </Card>

                <Card style={[styles.card, styles.spacer]}>
                    <Card.Title title="Itens" left={Items} />
                    <Divider />
                    <Card.Content style={[styles.defaultPaddingHorizontal, { paddingBottom: 0, paddingTop: 12 }]}>

                        <View style={styles.spacer}>
                            <Text style={styles.spacer}>Pergunta 1</Text>
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
                            <Text>{item1}</Text>
                        </View>

                        {/* <View style={styles.spacer}>
                            <Text style={styles.spacer}>Pergunta 2</Text>
                            <ToggleButton.Row
                                onValueChange={item2 => this.setState({ item2 })}
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
                            <Text style={styles.spacer}>Pergunta 3</Text>
                            <ToggleButton.Row
                                onValueChange={item3 => this.setState({ item3 })}
                                value={this.state.item3}
                            >
                                <ToggleButton icon="numeric-1" value="one" style={{ flex: 1 }} />
                                <ToggleButton icon="numeric-2" value="two" style={{ flex: 1 }} />
                                <ToggleButton icon="numeric-3" value="three" style={{ flex: 1 }} />
                                <ToggleButton icon="numeric-4" value="four" style={{ flex: 1 }} />
                                <ToggleButton icon="numeric-5" value="five" style={{ flex: 1 }} />
                            </ToggleButton.Row>
                        </View>

                        <View style={styles.spacer}>
                            <Text style={styles.spacer}>Pergunta 4</Text>
                            <ToggleButton.Row
                                onValueChange={item4 => this.setState({ item4 })}
                                value={this.state.item4}
                            >
                                <ToggleButton icon="numeric-1" value="one" style={{ flex: 1 }} />
                                <ToggleButton icon="numeric-2" value="two" style={{ flex: 1 }} />
                                <ToggleButton icon="numeric-3" value="three" style={{ flex: 1 }} />
                                <ToggleButton icon="numeric-4" value="four" style={{ flex: 1 }} />
                                <ToggleButton icon="numeric-5" value="five" style={{ flex: 1 }} />
                            </ToggleButton.Row>
                        </View>

                        <View style={styles.spacer}>
                            <Text style={styles.spacer}>Pergunta 5</Text>
                            <ToggleButton.Row
                                onValueChange={item5 => this.setState({ item5 })}
                                value={this.state.item5}
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

                {/* <Card style={[styles.card, styles.spacer]}>
                    <Card.Title title="Comentário" left={Comment} />
                    <Divider />
                    <Card.Content style={[styles.defaultPaddingHorizontal, styles.defaultPaddingVertical]}>
                        <TextInput
                            label='Comentários'
                            value={this.state.comment}
                            onChangeText={comment => this.setState({ comment })}
                            mode='outlined'
                            multiline={true}
                        />
                    </Card.Content>
                </Card> */}

            </ScrollView>
        </View>
    );
};