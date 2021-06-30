import React, { Component } from 'react'
import { View, Text, StyleSheet, 
    ImageBackground, TouchableOpacity, 
    Alert, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import 'moment/locale/pt-br'
import Constants from 'expo-constants'
import AsyncStorage from '@react-native-async-storage/async-storage'

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

    componentDidMount = async () => {
        // const stateString = await AsyncStorage.getItem('taskState')
        // const state = JSON.parse(stateString) || initialSate
        // this.setState(state, this.filterTasks)
    }

    toggleFilter = () => {
    //     this.setState({showDoneTasks: !this.state.showDoneTasks }, this.filterTasks)
    }

    filterTasks = () => {
    //     let visibleTasks = null
    //     if (this.state.showDoneTasks) {
    //         visibleTasks = [...this.state.tasks]
    //     } else {
    //         const pending = task => task.doneAt == null
    //         visibleTasks = this.state.tasks.filter(pending)
    //     }
        
    //     this.setState({visibleTasks})
    //     AsyncStorage.setItem('taskState', JSON.stringify(this.state))
    }
    



    addTask = taskParam => {
        if (!taskParam.desc || !taskParam.desc.trim()) {
            Alert.alert('Dados inválidos', 'Descrição não informada!')
            return
        }

        let tasks = [...this.state.tasks]
        tasks.push({
            id: Math.random(),
            desc: taskParam.desc,
            estimateAt: taskParam.date,
            doneAt: null
        })

        this.setState({ tasks, showAddTask: false}, this.filterTasks)
        console.warn(this.state.tasks)

    }

    toggleTask = taskId => {
    //     const tasks =  [...this.state.tasks]
    //     tasks.forEach(task => {
    //         if (task.id == taskId) {
    //             task.doneAt = task.doneAt ? null : new Date()
    //         }
    //     })

    //     this.setState({ tasks }, this.filterTasks)
    }

    deleteTask = id => {
    //     const tasks = this.state.tasks.filter(task => task.id !== id)
    //     this.setState({ tasks }, this.filterTasks)
    }

    render() {

        const TODAY = moment().locale('pt-br').format('ddd, D [de] MMMM')
        //https://momentjs.com/
        //outra opçao da documentacao
        //const TODAY = moment().format('LL');

        return (
            <View style={styles.container}>
                <AddTask isVisible={this.state.showAddTask}
                    onCancel={() => this.setState({showAddTask: false})} 
                    onSave={this.addTask}/>
                <ImageBackground source={todayImage} 
                    style={styles.background}>
                    <View style={styles.iconBar}>
                        <TouchableOpacity>
                        {/* <TouchableOpacity onPress={this.toggleFilter}> */}
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

                    <FlatList data={this.state.tasks}
                    // <FlatList data={this.state.visibleTasks}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({item}) => <Task {...item}/>}/>
                        {/* renderItem={({item}) => <Task {...item} onDelete={this.deleteTask} onToggleTask={this.toggleTask}/>}/> */}

                </View>
                <TouchableOpacity style={styles.addButton}
                    onPress={() => this.setState({showAddTask: true})}>
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