import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Orcamento from './pages/orcamento'

export default function(){

   const Stack = createStackNavigator()

   return(
      <NavigationContainer>
         <Stack.Navigator>
            <Stack.Screen name="Orcamento" component={Orcamento} />
         </Stack.Navigator>
      </NavigationContainer>
   )

}
