import { Tabs } from 'expo-router'
import { Home } from 'lucide-react-native';

export default function _layout() {
  return (
   <Tabs>
         <Tabs.Screen name='jobSeekerHome' 
            options={{
               title:'Home', 
               headerShown: false, 
               tabBarIcon: () => (
                  <Home size={18}></Home>
               )}}>
         </Tabs.Screen>

         <Tabs.Screen name='prospectsScreen' 
         options={{
            title: 'Prospects', 
            headerShown: false, 
            tabBarIcon: () => (
               <Home size={18}></Home>
            )}}>
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