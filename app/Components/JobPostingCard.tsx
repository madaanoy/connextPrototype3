import React from 'react';
import {
  Image,
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
import companyLogo from '../../assets/images/placeholderImage.png';
import { BriefcaseBusiness, PhilippinePeso, MapPin, Expand, Minimize } from 'lucide-react-native';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

// Job postings data
const jobPostings = [
  {
    id: 1,
    company: "Jollibee",
    position: "Clean Up Crew",
    salary: "PHP 40,000 - 55,000/month",
    location: "Ateneo Ave, Naga City, 4400",
    match: "80% match for you",
    description: "The Cleanup Crew Member is responsible for maintaining a clean and safe environment in the Jollibee restaurant.\n\nThis includes cleaning dining areas, restrooms, kitchen spaces, and outdoor areas, ensuring that high standards of hygiene and safety are met throughout the restaurant.",
    modalTitle: "Clean Up Crew",
    modalMatch: "80% match for you!",
    qualifications: [
      "High school diploma or equivalent",
      "Physical ability to lift up to 25kg",
      "Attention to detail and cleanliness"
    ],
    responsibilities: [
      "Clean dining areas and restrooms",
      "Sanitize kitchen equipment",
      "Maintain outdoor cleanliness"
    ],
    skills: [
      "Time management",
      "Physical stamina",
      "Team collaboration"
    ],
    jobType: [
      "Full-time position",
      "8-hour shifts",
      "Rotating schedule"
    ],
    experience: "No experience required."
  },
  {
    id: 2,
    company: "McDonald's",
    position: "Service Crew",
    salary: "PHP 35,000 - 50,000/month",
    location: "SM City Naga, Triangulo, Naga City",
    match: "92% match for you",
    description: "Join our team as a Service Crew member where you'll be the face of McDonald's, serving customers with a smile and ensuring their dining experience is exceptional.\n\nYou'll take orders, prepare food, and maintain the highest standards of customer service in our fast-paced environment.",
    modalTitle: "Service Crew",
    modalMatch: "92% match for you!",
    qualifications: [
      "High school graduate",
      "Good communication skills",
      "Customer service orientation"
    ],
    responsibilities: [
      "Take customer orders accurately",
      "Prepare and serve food items",
      "Handle cash transactions"
    ],
    skills: [
      "Communication skills",
      "Multitasking ability",
      "Cash handling"
    ],
    jobType: [
      "Full-time/Part-time",
      "Flexible shifts",
      "Weekend availability"
    ],
    experience: "Fresh graduates welcome."
  },
  {
    id: 3,
    company: "KFC",
    position: "Kitchen Staff",
    salary: "PHP 38,000 - 52,000/month",
    location: "Magsaysay Ave, Naga City, 4400",
    match: "75% match for you",
    description: "Be part of KFC's kitchen team where you'll prepare our world-famous chicken and other menu items following strict quality and safety standards.\n\nThis role involves food preparation, cooking, and maintaining kitchen cleanliness while working in a fast-paced team environment.",
    modalTitle: "Kitchen Staff",
    modalMatch: "75% match for you!",
    qualifications: [
      "Food safety certification preferred",
      "Ability to work under pressure",
      "Basic cooking knowledge"
    ],
    responsibilities: [
      "Prepare chicken and menu items",
      "Follow food safety protocols",
      "Maintain kitchen equipment"
    ],
    skills: [
      "Food preparation",
      "Equipment operation",
      "Safety compliance"
    ],
    jobType: [
      "Full-time position",
      "Split shifts available",
      "Holiday work required"
    ],
    experience: "1-2 years kitchen experience preferred."
  },
  {
    id: 4,
    company: "Starbucks",
    position: "Barista",
    salary: "PHP 45,000 - 60,000/month",
    location: "Robinsons Place Naga, Naga City",
    match: "88% match for you",
    description: "Create the Starbucks experience for our customers by crafting handcrafted beverages and providing exceptional customer service in our welcoming café environment.\n\nYou'll be trained to prepare a variety of coffee drinks while building meaningful connections with our customers.",
    modalTitle: "Barista",
    modalMatch: "88% match for you!",
    qualifications: [
      "College level or graduate",
      "Excellent interpersonal skills",
      "Willingness to learn coffee craft"
    ],
    responsibilities: [
      "Prepare coffee and specialty drinks",
      "Provide exceptional customer service",
      "Maintain store cleanliness"
    ],
    skills: [
      "Coffee preparation",
      "Customer interaction",
      "Product knowledge"
    ],
    jobType: [
      "Full-time opportunity",
      "Morning/evening shifts",
      "Benefits included"
    ],
    experience: "Barista experience is a plus but not required."
  },
  {
    id: 5,
    company: "Chowking",
    position: "Cashier",
    salary: "PHP 32,000 - 45,000/month",
    location: "Central Business District, Naga City",
    match: "95% match for you",
    description: "Handle customer transactions with accuracy and efficiency while providing friendly service that represents the Chowking brand.\n\nYou'll process orders, handle payments, and ensure every customer leaves satisfied with their dining experience.",
    modalTitle: "Cashier",
    modalMatch: "95% match for you!",
    qualifications: [
      "High school diploma required",
      "Strong numerical skills",
      "Customer service experience"
    ],
    responsibilities: [
      "Process customer orders",
      "Handle cash and card payments",
      "Maintain accurate transactions"
    ],
    skills: [
      "Cash handling",
      "POS system operation",
      "Customer relations"
    ],
    jobType: [
      "Full-time position",
      "6-day work week",
      "Performance incentives"
    ],
    experience: "Cashier experience preferred but not required."
  }
];

export default function JobPostingCard() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [currentJobIndex, setCurrentJobIndex] = React.useState(0);
  const show = () => setModalVisible(true);
  const hide = () => setModalVisible(false);

  // Get current job posting
  const currentJob = jobPostings[currentJobIndex];

  // Bottom sheet config (unchanged behavior, renamed pan -> sheetPan)
  const maxHeightPercent = 0.8;
  const sheetHeight = SCREEN_HEIGHT * maxHeightPercent;

  const translateY = React.useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const sheetPan = React.useRef(new Animated.Value(0)).current; // vertical pan for sheet

  // --- Card horizontal swipe config ---
  const cardPan = React.useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25; // how far to swipe before it counts

  // Keep track of the current offset for smooth dragging
  const cardOffset = React.useRef({ x: 0, y: 0 });

  // animated styles for visual feedback
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

  // callbacks for swipe actions - now cycles through job postings
  const onSwipeRight = () => {
    // Move to next job posting (save/like action)
    console.log('Swiped RIGHT - Liked job:', currentJob.company, currentJob.position);
    setCurrentJobIndex((prevIndex) => (prevIndex + 1) % jobPostings.length);
  };

  const onSwipeLeft = () => {
    // Move to next job posting (dismiss action)
    console.log('Swiped LEFT - Dismissed job:', currentJob.company, currentJob.position);
    setCurrentJobIndex((prevIndex) => (prevIndex + 1) % jobPostings.length);
  };

  // PanResponder for the card (horizontal)
  const cardPanResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dx) > 5 && Math.abs(gestureState.dx) > Math.abs(gestureState.dy),
      onPanResponderGrant: () => {
        // Store the current offset and reset the animated value
        cardOffset.current = {
          x: (cardPan.x as any)._value || 0,
          y: (cardPan.y as any)._value || 0,
        };
        cardPan.setOffset(cardOffset.current);
        cardPan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([null, { dx: cardPan.x, dy: cardPan.y }], { useNativeDriver: false }),
      onPanResponderRelease: (_, gestureState) => {
        cardPan.flattenOffset();
        const { dx, vx } = gestureState;
        const absDx = Math.abs(dx);

        // If swipe passed threshold or was fast, slide out
        if (absDx > SWIPE_THRESHOLD || Math.abs(vx) > 0.8) {
          const toRight = dx > 0;
          const toX = toRight ? SCREEN_WIDTH * 1.2 : -SCREEN_WIDTH * 1.2;

          Animated.timing(cardPan, {
            toValue: { x: toX, y: 0 },
            duration: 220,
            useNativeDriver: false,
          }).start(() => {
            // trigger action, then reset position for next card
            if (toRight) onSwipeRight();
            else onSwipeLeft();

            // small timeout so users can see the slide-away before resetting
            setTimeout(() => {
              cardPan.setValue({ x: 0, y: 0 });
              cardOffset.current = { x: 0, y: 0 };
            }, 60);
          });
        } else {
          // return to center smoothly
          Animated.spring(cardPan, {
            toValue: { x: 0, y: 0 },
            friction: 6,
            useNativeDriver: false,
          }).start();
        }
      },
      onPanResponderTerminate: () => {
        // ensure it returns to center if interrupted
        Animated.spring(cardPan, { toValue: { x: 0, y: 0 }, friction: 6, useNativeDriver: false }).start();
      },
    })
  ).current;

  // PanResponder for the bottom sheet (vertical)
  const sheetPanResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dy) > 5,
      onPanResponderMove: Animated.event([null, { dy: sheetPan }], { useNativeDriver: false }),
      onPanResponderRelease: (_, { dy, vy }) => {
        if (dy > 120 || vy > 1.2) {
          closeSheet();
        } else {
          Animated.spring(sheetPan, { toValue: 0, useNativeDriver: false }).start();
        }
      },
    })
  ).current;

  React.useEffect(() => {
    if (modalVisible) {
      sheetPan.setValue(0);
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT,
        duration: 220,
        useNativeDriver: true,
      }).start(() => sheetPan.setValue(0));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalVisible]);

  function closeSheet() {
    Animated.timing(translateY, {
      toValue: SCREEN_HEIGHT,
      duration: 220,
      useNativeDriver: true,
    }).start(() => {
      sheetPan.setValue(0);
      setModalVisible(false);
    });
  }

  const translateYStyle = { transform: [{ translateY: Animated.add(translateY, sheetPan) }] };

  // card animated style - properly typed
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
      {/* Wrap original Card in an Animated.View that handles horizontal swipe */}
      <Animated.View
        style={[
          { margin: 10, borderRadius: 15 },
          cardAnimatedStyle,
        ]}
        {...cardPanResponder.panHandlers}
      >
        <Card style={{ borderRadius: 15, backgroundColor: '#6C63FF' }}>
          <Card.Content>
            {/* Row: logo + posted by */}
            <View className="flex-row items-center space-x-3">
              <Image source={companyLogo} className="w-12 h-12 rounded-full" style={{ resizeMode: 'cover' }} />
              <View className="ml-2">
                <Text style={{ fontFamily: 'Lexend-Bold' }} className="text-white text-xs">
                  Posted by:
                </Text>
                <Text style={{ fontFamily: 'Lexend-Bold' }} className="text-white text-2xl">
                  {currentJob.company}
                </Text>
              </View>
            </View>

            <View className="py-4 px-2">
              <View className="flex-row items-center space-x-2 mb-2">
                <BriefcaseBusiness size={20} color={'white'} />
                <Text style={{ fontFamily: 'Lexend-Bold' }} className="text-white text-xl ml-2">
                  {currentJob.position}
                </Text>
              </View>

              <View className="flex-row items-center space-x-2 mb-2">
                <PhilippinePeso size={20} color={'white'} />
                <Text style={{ fontFamily: 'Lexend-Bold' }} className="text-white text-lg ml-2">
                  {currentJob.salary}
                </Text>
              </View>

              <View className="flex-row items-center space-x-2 mb-2">
                <MapPin size={20} color={'white'} />
                <Text style={{ fontFamily: 'Lexend-Medium' }} className="text-white text-lg ml-2">
                  {currentJob.location}
                </Text>
              </View>

              <View className="border-b border-gray-300 my-5" />

              <View>
                <Text style={{ fontFamily: 'Lexend-Regular' }} className="text-white text-base text-justify">
                  {currentJob.description}
                </Text>
              </View>

              <View className="flex-row items-center justify-evenly py-3 mt-5">
                <Text style={{ fontFamily: 'Lexend-Regular' }} className="px-3 py-2 bg-slate-100 rounded-xl text-[#1572DB]">
                  {currentJob.match}
                </Text>

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

      {/* Bottom Sheet Modal (NativeWind styling) */}
      <Modal visible={modalVisible} transparent animationType="none" onRequestClose={closeSheet}>
        <View className="flex-1 justify-end">
          {/* Backdrop */}
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
              {/* Drag handle */}
              <View {...sheetPanResponder.panHandlers} className="items-center pt-2 pb-1">
                <View className="w-10 h-1.5 rounded-md bg-gray-300" />
              </View>

              {/* Title row */}
              <View className="flex-row items-center justify-center py-4 pb-2">
                <Text style={{ fontFamily: 'Lexend-Bold', fontSize: 20 }}>{currentJob.modalTitle}</Text>

                <TouchableOpacity onPress={closeSheet} className="absolute right-3 top-1 p-2">
                  <Text className="text-lg text-gray-700">✕</Text>
                </TouchableOpacity>
              </View>

              {/* Scrollable content */}
              <ScrollView contentContainerStyle={{ paddingHorizontal: 18, paddingBottom: 24 }}>
                <Text style={{ fontFamily: 'Lexend-Medium', marginBottom: 6, fontSize: 14 }} className="text-center py-2">
                  Posted by: {currentJob.company}
                </Text>

                <View className="flex-row justify-between space-x-4">
                  <View className="flex-1 pr-2">
                    <Text style={{ fontFamily: 'Lexend-Medium', fontSize: 16 }} className="text-[#5b21b6] font-semibold mb-2">
                      Qualifications
                    </Text>

                    {currentJob.qualifications.map((qual, index) => (
                      <Text key={index} className="mb-2">• {qual}</Text>
                    ))}
                  </View>

                  <View className="flex-1 pl-2">
                    <Text style={{ fontFamily: 'Lexend-Medium', fontSize: 16 }} className="text-[#5b21b6] font-semibold mb-2">
                      Key Responsibilities
                    </Text>
                    {currentJob.responsibilities.map((resp, index) => (
                      <View key={index} className="mb-2">
                        <Text>• {resp}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                <View className="h-3" />

                <View className="flex-row justify-between space-x-4">
                  <View className="flex-1 pr-2">
                    <Text style={{ fontFamily: 'Lexend-Medium', fontSize: 16 }} className="text-[#5b21b6] font-semibold mb-2">
                      Skills
                    </Text>

                    {currentJob.skills.map((skill, index) => (
                      <Text key={index} className="mb-2">• {skill}</Text>
                    ))}
                  </View>

                  <View className="flex-1 pl-2">
                    <Text style={{ fontFamily: 'Lexend-Medium', fontSize: 16 }} className="text-[#5b21b6] font-semibold mb-2">
                      Job Type
                    </Text>
                    {currentJob.jobType.map((type, index) => (
                      <View key={index} className="mb-2">
                        <Text>• {type}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                <View className="h-4" />

                <Text style={{ fontFamily: 'Lexend-Medium', fontSize: 16 }} className="text-[#5b21b6] font-semibold mt-1 mb-2">
                  Experience
                </Text>
                <Text>{currentJob.experience}</Text>

                <View style={{ height: 32 }} />
              </ScrollView>

              {/* Footer */}
              <View className="flex-row justify-evenly items-center jpx-3 py-3">
                <TouchableOpacity className="bg-[#1f6feb] px-4 py-3 rounded-lg items-center">
                  <Text className="text-white font-bold" style={{ fontFamily: 'Lexend-Bold' }}>
                    {currentJob.modalMatch}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={closeSheet} className="flex-row ml-3 py-2 px-2">
                  <Text className="text-gray-800 font-bold px-2">Tap to view less</Text>
                  <Minimize size={20}></Minimize>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}