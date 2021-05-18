import React from 'react'
import { createStackNavigator, StackHeaderProps } from '@react-navigation/stack';
import colors from '../styles/colors';
import { Welcome } from '../pages/Welcome';
import { UserIdentification } from '../pages/UserIdentification';
import { Dashboard } from '../pages/Dashboard';
import { CreateExpense } from '../pages/CreateExpense';
import { DetailsExpense } from '../pages/DetailsExpense';
import { EditExpense } from '../pages/EditExpenses';


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
            component={CreateExpense}
        />
        <stackRoutes.Screen
            name="DetailsExpense"
            component={DetailsExpense}
        />
        <stackRoutes.Screen
            name="EditExpense"
            component={EditExpense}
        />
    </stackRoutes.Navigator>
)

export default AppRoutes;