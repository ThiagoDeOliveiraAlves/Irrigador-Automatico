import 'react-native-gesture-handler';
import React from "react";
import {View, StyleSheet} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer';

import Inicio from "./src/pages/Inicio";
import Dashboard from "./src/pages/Dashboard";
import DefinirUmidade from "./src/pages/DefinirUmidade";
import GerenciarSensor from "./src/pages/GerenciarSensor";
import GerenciarBomba from './src/pages/GerenciarBomba';
import PagDeTestes from './src/pages/PagDeTestes';

//const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
    <Drawer.Navigator style={styles.container}>
      <Drawer.Screen name="Inicio" component={Inicio}/>
      <Drawer.Screen name="Definir níveis de umidade" component={DefinirUmidade}/>
      <Drawer.Screen name="Gerenciar sensores" component={GerenciarSensor}/>
      <Drawer.Screen name="Gerenciar Bomba" component={GerenciarBomba}/>
      <Drawer.Screen name="Exibir Dashboard" component={Dashboard}/>
      <Drawer.Screen name="Página de testes" component={PagDeTestes}/>
      
    </Drawer.Navigator>
    </NavigationContainer>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e5e5',
    paddingTop: 80,
    alignItems: "center",
    textAlign: "center",
  },
});



