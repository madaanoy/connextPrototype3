import { Stack, Tabs } from 'expo-router'

export default function _layout() {
   return (
      <Tabs>
         
         <Tabs.Screen name='employerHome' 
         options={{title: 'Home', 
         headerShown: false}}>

         </Tabs.Screen>

         <Tabs.Screen name='applicantsScreen' 
         options={{title: 'Applicants', 
         headerShown: false}}>

         </Tabs.Screen>

         <Tabs.Screen name='messagesScreen' 
         options={{title: 'Messages', 
         headerShown: false}}>

         </Tabs.Screen>

         <Tabs.Screen name='profileScreen' 
         options={{title: 'Profile', 
         headerShown: false}}>

         </Tabs.Screen>

      </Tabs>
   )
}