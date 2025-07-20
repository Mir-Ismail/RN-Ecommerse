import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AuthContext } from '../context/AuthContext';
import AddCategory from './AddCategory';
import AddSubCategory from './AddSubCategory';
import AddItems from './AddItem';

const Tab = createMaterialTopTabNavigator();

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{user?.email || 'Admin'} Dashboard</Text>
      
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },
          tabBarStyle: { backgroundColor: '#e6f2ff' },
          tabBarIndicatorStyle: { backgroundColor: '#0066cc' },
        }}
      >
        <Tab.Screen 
          name="AddCategory" 
          component={AddCategory} 
          options={{ tabBarLabel: 'Add Category' }} 
        />
        <Tab.Screen 
          name="AddSubCategory" 
          component={AddSubCategory} 
          options={{ tabBarLabel: 'Add SubCategory' }} 
        />
        <Tab.Screen 
          name="AddItems" 
          component={AddItems} 
          options={{ tabBarLabel: 'Add Items' }} 
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f2ff',
  },
  header: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
    padding: 15,
    paddingTop: 20,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
});

export default AdminDashboard;