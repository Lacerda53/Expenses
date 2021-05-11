import React from 'react'
import { createStackNavigator, StackHeaderProps } from '@react-navigation/stack';
import colors from '../styles/colors';
import { Welcome } from '../pages/Welcome';
import { UserIdentification } from '../pages/UserIdentification';
import { Dashboard } from '../pages/Dashboard';
import { CreateExpense } from '../pages/CreateExpense';


const stackRoutes = createStackNavigator()

const AppRoutes: React.FC = () => (
    <stackRoutes.Navigator
        screenOptions={
            {
                headerShown: false,
                cardStyle: {
                    backgroundColor: colors.white
                }
            }
        }>
        <stackRoutes.Screen
            name="Welcome"
            component={Welcome}
        />
        <stackRoutes.Screen
            name="UserIdentification"
            component={UserIdentification}
        />
        <stackRoutes.Screen
            name="Dashboard"
            component={Dashboard}
        />
        <stackRoutes.Screen
            name="CreateExpense"
            options={{
                title:'Nova Despesa',
                headerShown: true
            }}
            component={CreateExpense}
        />
    </stackRoutes.Navigator>
)

export default AppRoutes;