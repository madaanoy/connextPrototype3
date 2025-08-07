import { Stack, Tabs } from 'expo-router'

export default function _layout() {
   return (
      <Tabs>
         
         <Tabs.Screen name='employerHome' 
         options={{
         title: 'Home', 
         headerShown: false,
         tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Lexend-Regular',
            marginTop: 4,
         },
         }}>

         </Tabs.Screen>

         <Tabs.Screen name='applicantsScreen' 
         options={{
         title: 'Applicants', 
         headerShown: false, 
         tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Lexend-Regular',
            marginTop: 4,
         }}}>

         </Tabs.Screen>

         <Tabs.Screen name='messagesScreen' 
         options={{title: 'Messages', 
         headerShown: false,
         tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Lexend-Regular',
            marginTop: 4,
            }
         }}>

         </Tabs.Screen>

         <Tabs.Screen name='profileScreen' 
         options={{title: 'Profile', 
         headerShown: false,
         tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Lexend-Regular',
            marginTop: 4,
         }
         }}>

         </Tabs.Screen>

      </Tabs>
   )
}