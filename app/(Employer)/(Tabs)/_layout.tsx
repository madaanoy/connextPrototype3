import { Tabs } from 'expo-router'
import { Home, Inbox, MessageCircle, UserRound } from 'lucide-react-native';

export default function _layout() {
   return (
      <Tabs initialRouteName='employer-home'>

         <Tabs.Screen name='employer-home'
            options={{
               title: 'Home',
               tabBarLabelStyle: {
                  fontSize: 12,
                  fontFamily: 'Lexend-Regular',
                  marginTop: 2,
               },
               headerShown: false,
               tabBarActiveTintColor: '#6C63FF',
               tabBarInactiveTintColor: '#999999',
               tabBarIcon: ({ color, focused }) =>
               (
                  <Home size={18}
                     color={focused ? '#6C63FF' : '#999'}>
                  </Home>
               )
            }}>
         </Tabs.Screen>

         <Tabs.Screen name='applicants-screen'
            options={{
               title: 'Applicants',
               tabBarLabelStyle: {
                  fontSize: 12,
                  fontFamily: 'Lexend-Regular',
                  marginTop: 2,
               },
               headerShown: false,
               tabBarActiveTintColor: '#6C63FF',
               tabBarInactiveTintColor: '#999999',
               tabBarIcon: ({ color, focused }) =>
               (
                  <Inbox size={18}
                     color={focused ? '#6C63FF' : '#999'}></Inbox>
               )
            }}>
         </Tabs.Screen>

         <Tabs.Screen name='messages-screen'
            options={{
               title: 'Messages',
               headerShown: false,
               tabBarLabelStyle: {
                  fontSize: 12,
                  fontFamily: 'Lexend-Regular',
                  marginTop: 2,
               },
               tabBarActiveTintColor: '#6C63FF',
               tabBarInactiveTintColor: '#999999',
               tabBarIcon: ({ color, focused }) =>
                  <MessageCircle
                     size={18}
                     color={focused ? '#6C63FF' : '#999'}>
                  </MessageCircle>
            }}>

         </Tabs.Screen>

         <Tabs.Screen name='profile-screen'
            options={{
               title: 'Profile',
               headerShown: false,
               tabBarLabelStyle: {
                  fontSize: 12,
                  fontFamily: 'Lexend-Regular',
                  marginTop: 2,
               },
               tabBarActiveTintColor: '#6C63FF',
               tabBarInactiveTintColor: '#999999',
               tabBarIcon: ({ color, focused }) =>
                  <UserRound
                     size={20}
                     color={focused ? '#6C63FF' : '#999'}>
                  </UserRound>
            }}>

         </Tabs.Screen>

      </Tabs>
   )
}