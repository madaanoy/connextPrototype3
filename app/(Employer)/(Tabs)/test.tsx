import React from 'react';
import {
   Animated,
   Dimensions,
   PanResponder,
   Modal,
   Pressable,
   SafeAreaView,
   ScrollView,
   TouchableOpacity,
   View,
   Text,
   ViewStyle,
} from 'react-native';
import { Card } from 'react-native-paper';
import { GraduationCap, MapPin, Expand, Minimize } from 'lucide-react-native';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

// Applicants data
const applicants = [
   {
      id: 1,
      fullName: "Juan Dela Cruz",
      degree: "Bachelor of Science in Information Technology",
      location: "Ateneo Ave, Naga City, 4400",
      skills: ["JavaScript", "React Native", "UI/UX Design"],
      experience: "2 years as a Mobile Developer at XYZ Corp.",
      contact_no: '',
      certifications: ''
   },
   {
      id: 2,
      fullName: "Maria Santos",
      degree: "Master of Business Administration",
      location: "Quezon City, Philippines",
      skills: ["Project Management", "Leadership", "Marketing Strategy"],
      experience: "5 years experience in corporate project management.",
      contact_no: '',
      certifications: ''
   },
];

export default function ApplicantCard() {
   const [modalVisible, setModalVisible] = React.useState(false);
   const [currentIndex, setCurrentIndex] = React.useState(0);

   const currentApplicant = applicants[currentIndex];

   // Bottom sheet config
   const maxHeightPercent = 0.8;
   const sheetHeight = SCREEN_HEIGHT * maxHeightPercent;

   const translateY = React.useRef(new Animated.Value(SCREEN_HEIGHT)).current;
   const sheetPan = React.useRef(new Animated.Value(0)).current;

   // Card swipe config
   const cardPan = React.useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
   const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;
   const cardOffset = React.useRef({ x: 0, y: 0 });

   const rotate = cardPan.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ['-10deg', '0deg', '10deg'],
      extrapolate: 'clamp',
   });

   const opacity = cardPan.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [0.7, 1, 0.7],
      extrapolate: 'clamp',
   });

   const scale = cardPan.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [0.98, 1, 0.98],
      extrapolate: 'clamp',
   });

   // swipe actions
   const onSwipeRight = (index: number) => {
      console.log('Shortlisted applicant:', applicants[index].fullName);
      setCurrentIndex((prev) => (prev + 1) % applicants.length);
   };

   const onSwipeLeft = (index: number) => {
      console.log('Dismissed applicant:', applicants[index].fullName);
      setCurrentIndex((prev) => (prev + 1) % applicants.length);
   };

   const cardPanResponder = React.useMemo(
      () =>
         PanResponder.create({
            onStartShouldSetPanResponder: () => false,
            onMoveShouldSetPanResponder: (_, gestureState) =>
               Math.abs(gestureState.dx) > 5 &&
               Math.abs(gestureState.dx) > Math.abs(gestureState.dy),
            onPanResponderGrant: () => {
               cardOffset.current = {
                  x: (cardPan.x as any)._value || 0,
                  y: (cardPan.y as any)._value || 0,
               };
               cardPan.setOffset(cardOffset.current);
               cardPan.setValue({ x: 0, y: 0 });
            },
            onPanResponderMove: Animated.event(
               [null, { dx: cardPan.x, dy: cardPan.y }],
               { useNativeDriver: false }
            ),
            onPanResponderRelease: (_, gestureState) => {
               cardPan.flattenOffset();
               const { dx, vx } = gestureState;
               const absDx = Math.abs(dx);

               if (absDx > SWIPE_THRESHOLD || Math.abs(vx) > 0.8) {
                  const toRight = dx > 0;
                  const toX = toRight ? SCREEN_WIDTH * 1.2 : -SCREEN_WIDTH * 1.2;

                  Animated.timing(cardPan, {
                     toValue: { x: toX, y: 0 },
                     duration: 220,
                     useNativeDriver: false,
                  }).start(() => {
                     if (toRight) onSwipeRight(currentIndex);
                     else onSwipeLeft(currentIndex);

                     cardPan.setValue({ x: 0, y: 0 });
                     cardOffset.current = { x: 0, y: 0 };
                  });
               } else {
                  Animated.spring(cardPan, {
                     toValue: { x: 0, y: 0 },
                     friction: 6,
                     useNativeDriver: false,
                  }).start();
               }
            },
         }),
      [currentIndex]
   );

   const sheetPanResponder = React.useRef(
      PanResponder.create({
         onStartShouldSetPanResponder: () => false,
         onMoveShouldSetPanResponder: (_, gestureState) =>
            Math.abs(gestureState.dy) > 5,
         onPanResponderMove: Animated.event([null, { dy: sheetPan }], {
            useNativeDriver: false,
         }),
         onPanResponderRelease: (_, { dy, vy }) => {
            if (dy > 120 || vy > 1.2) {
               closeSheet();
            } else {
               Animated.spring(sheetPan, { toValue: 0, useNativeDriver: false }).start();
            }
         },
      })
   ).current;

   const show = () => {
      setModalVisible(true);
      Animated.timing(translateY, {
         toValue: 0,
         duration: 250,
         useNativeDriver: true,
      }).start();
   };

   const closeSheet = () => {
      Animated.timing(translateY, {
         toValue: SCREEN_HEIGHT,
         duration: 220,
         useNativeDriver: true,
      }).start(() => {
         sheetPan.setValue(0);
         setModalVisible(false);
      });
   };

   const translateYStyle = {
      transform: [{ translateY: Animated.add(translateY, sheetPan) }],
   };

   const cardAnimatedStyle: Animated.WithAnimatedObject<ViewStyle> = {
      transform: [
         { translateX: cardPan.x },
         { translateY: cardPan.y },
         { rotate },
         { scale },
      ],
      opacity,
   };

   return (
      <SafeAreaView className="flex-1">
         <Animated.View
            style={[{ margin: 10, borderRadius: 15 }, cardAnimatedStyle]}
            {...cardPanResponder.panHandlers}
         >
            <Card style={{ borderRadius: 15, backgroundColor: '#6C63FF' }}>
               <Card.Content>
                  <View className="flex-row items-center justify-center space-x-3">
                     <View className="ml-2">
                        <Text style={{ fontFamily: 'Lexend-Bold' }} className="text-white text-2xl">
                           {currentApplicant.fullName}
                        </Text>
                     </View>
                  </View>

                  <View className="py-4 px-2">

                     <View className="flex-row items-center space-x-2 mb-2">
                        <GraduationCap size={20} color={'white'} />
                        <Text style={{ fontFamily: 'Lexend-Regular' }} className="text-white text-lg ml-2">
                           {currentApplicant.degree}
                        </Text>
                     </View>

                     <View className="flex-row items-center space-x-2 mb-2">
                        <MapPin size={20} color={'white'} />
                        <Text style={{ fontFamily: 'Lexend-Medium' }} className="text-white text-lg ml-2">
                           {currentApplicant.location}
                        </Text>
                     </View>

                     <View className="border-b border-gray-300 my-5" />

                     <View>
                        <Text
                           style={{ fontFamily: 'Lexend-Regular' }}
                           className="text-white text-base"
                        >
                           Skills: {currentApplicant.skills.join(", ")}
                        </Text>
                     </View>

                     <View className="flex-row items-center justify-between py-3 mt-5">
                        <TouchableOpacity className="flex-row items-center" onPress={show}>
                           <Text
                              style={{ fontFamily: 'Lexend-Regular', textDecorationLine: 'underline' }}
                              className="text-white"
                           >
                              Tap to view more
                           </Text>
                           <View className="pl-3">
                              <Expand size={20} color={'white'} />
                           </View>
                        </TouchableOpacity>
                     </View>
                  </View>
               </Card.Content>
            </Card>
         </Animated.View>

         {/* Bottom Sheet Modal */}
         <Modal visible={modalVisible} transparent animationType="none" onRequestClose={closeSheet}>
            <View className="flex-1 justify-end">
               <Pressable
                  onPress={closeSheet}
                  style={{
                     position: 'absolute',
                     top: 0,
                     left: 0,
                     right: 0,
                     bottom: 0,
                     backgroundColor: 'rgba(0,0,0,0.45)',
                  }}
               />

               <Animated.View
                  style={[
                     translateYStyle,
                     {
                        height: sheetHeight - 100,
                        backgroundColor: 'white',
                        borderTopLeftRadius: 18,
                        borderTopRightRadius: 18,
                        overflow: 'hidden',
                     },
                  ]}
               >
                  <SafeAreaView className="flex-1">
                     {/* Handle */}
                     <View {...sheetPanResponder.panHandlers} className="items-center pt-2 pb-1">
                        <View className="w-10 h-1.5 rounded-md bg-gray-300" />
                     </View>

                     {/* Header */}
                     <View className="flex-row items-center justify-center py-4 pb-2">
                        <Text style={{ fontFamily: 'Lexend-Bold', fontSize: 20 }}>
                           {currentApplicant.fullName}
                        </Text>
                        <TouchableOpacity onPress={closeSheet} className="absolute right-3 top-1 p-2">
                           <Text className="text-lg text-gray-700">✕</Text>
                        </TouchableOpacity>
                     </View>

                     {/* Content */}
                     <ScrollView contentContainerStyle={{ paddingHorizontal: 18, paddingBottom: 24 }}>

                        {/* Degree */}
                        <Text
                           style={{ fontFamily: 'Lexend-Medium', fontSize: 16 }}
                           className="text-[#5b21b6] font-semibold mb-2"
                        >
                           Degree / Educational Attainment
                        </Text>
                        <Text style={{ fontFamily: 'Poppins-Regular' }} className="mb-4">
                           {currentApplicant.degree}
                        </Text>

                        {/* Experience */}
                        <Text
                           style={{ fontFamily: 'Lexend-Medium', fontSize: 16 }}
                           className="text-[#5b21b6] font-semibold mb-2"
                        >
                           Experience
                        </Text>
                        <Text style={{ fontFamily: 'Poppins-Regular' }} className="mb-4">
                           {currentApplicant.experience}
                        </Text>

                        {/* Skills */}
                        <Text
                           style={{ fontFamily: 'Lexend-Medium', fontSize: 16 }}
                           className="text-[#5b21b6] font-semibold mb-2"
                        >
                           Technical Skills
                        </Text>
                        {currentApplicant.skills.map((skill, index) => (
                           <Text key={index} style={{ fontFamily: 'Poppins-Regular' }} className="mb-2">
                              • {skill}
                           </Text>
                        ))}

                        <Text
                           style={{ fontFamily: 'Lexend-Medium', fontSize: 16 }}
                           className="text-[#5b21b6] font-semibold mb-2"
                        >
                           Address
                        </Text>

                        <Text className='mb-2'>
                           {currentApplicant.location}
                        </Text>

                        <Text
                           style={{ fontFamily: 'Lexend-Medium', fontSize: 16 }}
                           className="text-[#5b21b6] font-semibold mb-2"
                        >
                           Contact no.
                        </Text>
                        <Text className='mb-2'> Lorem ipsum </Text>

                        <Text
                           style={{ fontFamily: 'Lexend-Medium', fontSize: 16 }}
                           className="text-[#5b21b6] font-semibold mb-2"
                        >
                           Certifications
                        </Text>
                        <Text className='mb-2'> Lorem ipsum </Text>
                     </ScrollView>

                     {/* Footer */}
                     <View className="flex-row justify-center py-3 border-t border-gray-200">
                        <TouchableOpacity onPress={closeSheet} className="flex-row items-center">
                           <Text className="text-gray-800 font-bold px-2">Tap to view less</Text>
                           <Minimize size={20} />
                        </TouchableOpacity>
                     </View>
                  </SafeAreaView>
               </Animated.View>
            </View>
         </Modal>

      </SafeAreaView>
   );
}
