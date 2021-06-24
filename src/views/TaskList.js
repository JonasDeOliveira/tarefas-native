import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

const initialState = {

}
export default class TaskList extends Component {

    state = {...initialState}

    render() {
        return (
            <View style={styles.container}>
                <Text>TaskList</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {

    }
})