import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import colors from "../styles/colors";
import { Welcome } from "../pages/Welcome/Welcome";
import { UserIdentification } from "../pages/UserIdentification/UserIdentification";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import { CreateExpense } from "../pages/CreateExpense/CreateExpense";
import { DetailsExpense } from "../pages/DetailsExpense/DetailsExpense";
import { EditExpense } from "../pages/EditExpenses/EditExpenses";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <stackRoutes.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: colors.white,
        },
      }}
    >
      {user.token !== "" ? (
        <>
          <stackRoutes.Screen name="Dashboard" component={Dashboard} />
          <stackRoutes.Screen name="CreateExpense" component={CreateExpense} />
          <stackRoutes.Screen
            name="DetailsExpense"
            component={DetailsExpense}
          />
          <stackRoutes.Screen name="EditExpense" component={EditExpense} />
        </>
      ) : (
        <>
          <stackRoutes.Screen name="Welcome" component={Welcome} />
          <stackRoutes.Screen
            name="UserIdentification"
            component={UserIdentification}
          />
        </>
      )}
    </stackRoutes.Navigator>
  );
};

export default AppRoutes;
