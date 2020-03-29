import React from 'react'
import { View, Text, Image } from 'react-native'

import { TestComponent } from '../components/app'

export default class testScreen extends React.Component {
    render() {
        return (
            <View>
                <TestComponent />
            </View>
        )
    }
}