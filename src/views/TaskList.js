import React, { Component } from 'react'
import { View, Text, StyleSheet, 
    ImageBackground, TouchableOpacity, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import 'moment/locale/pt-br'
import Constants from 'expo-constants'

import commonStyles from '../commonStyles'
import todayImage from '../../assets/imgs/today.jpg'
import Task from '../components/Task'
import AddTask from '../views/AddTask'

const initialState = {
    showDoneTasks: true,
    showAddTask: false,
    visibleTasks: [],
    tasks: []
}
export default class TaskList extends Component {

    state = {...initialState}

    addTask = newTask => {
        if (!newTask.desc || !newTask.desc.trim()) {
            Alert.alert('Dados inválidos', 'Descrição não informada!')
        }
    }

    render() {

        const TODAY = moment().locale('pt-br').format('ddd, D [de] MMMM')
        //https://momentjs.com/
        //outra opçao da documentacao
        //const TODAY = moment().format('LL');

        return (
            <View style={styles.container}>
                <AddTask isVisible={this.state.showAddTask} onSave={this.addTask}/>
                <ImageBackground source={todayImage} 
                    style={styles.background}>
                    <View style={styles.iconBar}>
                        <TouchableOpacity>
                            <Icon name={this.state.showDoneTasks 
                                ? 'eye': 'eye-slash'}
                                size={30} 
                                color={commonStyles.colors.secondary}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subtitle}>{TODAY}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.containerList}>

                    <Task desc="Assistir Filme" 
                        estimateAt={new Date()}
                        doneAt={new Date()}/>

                    <Task desc="Lavar Roupa" 
                        estimateAt={new Date()}
                        doneAt={null}/>

                    <Task desc="varrer a casa" 
                        estimateAt={new Date()}
                        doneAt={new Date()}/>

                </View>
                <TouchableOpacity style={styles.addButton}>
                    <Icon name='plus' size={30}
                        color={commonStyles.colors.secondary}/>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 3
    },
    containerList: {
        flex: 7
    },
    iconBar: {
        flexDirection: 'row',
        justifyContent: "flex-end",
        marginHorizontal: 30,
        marginTop: Constants.statusBarHeight
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    title: {
        color: commonStyles.colors.secondary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 20
    },
    subtitle: {
        color: commonStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 20
    },
    addButton: {
        backgroundColor: commonStyles.colors.today,
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 30,
        bottom: 30,
        borderRadius: 40
    }
})