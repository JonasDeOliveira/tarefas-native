import React from 'react';
import TaskList from './src/views/TaskList'
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <>
    <TaskList/>
    <StatusBar style='light'/>
    </>
  );
}