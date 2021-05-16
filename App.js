import 'react-native-gesture-handler';
import React,{useEffect} from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { DefaultTheme,Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';

import Navigation from './src/Navigators'

import reducer from './src/store/reducer'
import {createStore, applyMiddleware, } from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'


const store = createStore(reducer);

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
    white : '#fafafa',
    bg : "#505056",
  },
};



const App = () => {

  useEffect(() => {
    return () => {
      console.log("halo setConnectedDevic")
    };
  }, [])
  
  return (
    <Provider store={store}>

    <PaperProvider theme={theme} >
          <NavigationContainer>
            <Navigation  />
          </NavigationContainer>
    </PaperProvider>
    </Provider>

    
  )
}

export default App

const styles = StyleSheet.create({})
