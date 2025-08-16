import { Stack, Tabs } from 'expo-router'

export default function _layout() {
   return (
      <Tabs>
         
         <Tabs.Screen name='employer-home' 
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

         <Tabs.Screen name='applicants-screen' 
         options={{
         title: 'Applicants', 
         headerShown: false, 
         tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Lexend-Regular',
            marginTop: 4,
         }}}>

         </Tabs.Screen>

         <Tabs.Screen name='messages-screen' 
         options={{title: 'Messages', 
         headerShown: false,
         tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Lexend-Regular',
            marginTop: 4,
            }
         }}>

         </Tabs.Screen>

         <Tabs.Screen name='profile-screen' 
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