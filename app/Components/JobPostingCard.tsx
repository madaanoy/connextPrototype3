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
} from 'react-native';
import { Card } from 'react-native-paper';
import companyLogo from '../../assets/images/placeholderImage.png';
import { BriefcaseBusiness, PhilippinePeso, MapPin, Expand } from 'lucide-react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function JobPostingCard() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const show = () => setModalVisible(true);
  const hide = () => setModalVisible(false);

  // Bottom sheet config
  const maxHeightPercent = 0.8;
  const sheetHeight = SCREEN_HEIGHT * maxHeightPercent;

  const translateY = React.useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const pan = React.useRef(new Animated.Value(0)).current;

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dy) > 5,
      onPanResponderMove: Animated.event([null, { dy: pan }], { useNativeDriver: false }),
      onPanResponderRelease: (_, { dy, vy }) => {
        if (dy > 120 || vy > 1.2) {
          closeSheet();
        } else {
          Animated.spring(pan, { toValue: 0, useNativeDriver: false }).start();
        }
      },
    })
  ).current;

  React.useEffect(() => {
    if (modalVisible) {
      pan.setValue(0);
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
      }).start(() => pan.setValue(0));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalVisible]);

  function closeSheet() {
    Animated.timing(translateY, {
      toValue: SCREEN_HEIGHT,
      duration: 220,
      useNativeDriver: true,
    }).start(() => {
      pan.setValue(0);
      setModalVisible(false);
    });
  }

  const translateYStyle = { transform: [{ translateY: Animated.add(translateY, pan) }] };

  return (
    <SafeAreaView className="flex-1">
      <Card style={{ margin: 10, borderRadius: 15, backgroundColor: '#6C63FF' }}>
        <Card.Content>
          {/* Row: logo + posted by */}
          <View className="flex-row items-center space-x-3">
            <Image source={companyLogo} className="w-12 h-12 rounded-full" style={{ resizeMode: 'cover' }} />
            <View className="ml-2">
              <Text style={{ fontFamily: 'Lexend-Bold' }} className="text-white text-xs">
                Posted by:
              </Text>
              <Text style={{ fontFamily: 'Lexend-Bold' }} className="text-white text-2xl">
                Jollibee
              </Text>
            </View>
          </View>

          <View className="py-4 px-2">
            <View className="flex-row items-center space-x-2 mb-2">
              <BriefcaseBusiness size={20} color={'white'} />
              <Text style={{ fontFamily: 'Lexend-Bold' }} className="text-white text-xl ml-2">
                Clean Up Crew
              </Text>
            </View>

            <View className="flex-row items-center space-x-2 mb-2">
              <PhilippinePeso size={20} color={'white'} />
              <Text style={{ fontFamily: 'Lexend-Bold' }} className="text-white text-lg ml-2">
                PHP 40,000 {'-'} 55,000/month
              </Text>
            </View>

            <View className="flex-row items-center space-x-2 mb-2">
              <MapPin size={20} color={'white'} />
              <Text style={{ fontFamily: 'Lexend-Medium' }} className="text-white text-lg ml-2">
                Ateneo Ave, Naga City, 4400
              </Text>
            </View>

            <View className="border-b border-gray-300 my-5" />

            <View>
              <Text style={{ fontFamily: 'Lexend-Regular' }} className="text-white text-base text-justify">
                The Cleanup Crew Member is responsible for maintaining a clean and safe environment in the Jollibee restaurant.
                {'\n\n'}
                This includes cleaning dining areas, restrooms, kitchen spaces, and outdoor areas, ensuring that high standards
                of hygiene and safety are met throughout the restaurant.
              </Text>
            </View>

            <View className="flex-row items-center justify-evenly py-3 mt-5">
              <Text style={{ fontFamily: 'Lexend-Regular' }} className="px-3 py-2 bg-slate-100 rounded-xl text-[#1572DB]">
                80% match for you
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
                height: sheetHeight,
                backgroundColor: 'white',
                borderTopLeftRadius: 18,
                borderTopRightRadius: 18,
                overflow: 'hidden',
              },
            ]}
          >
            <SafeAreaView className="flex-1">
              {/* Drag handle */}
              <View {...panResponder.panHandlers} className="items-center pt-2 pb-1">
                <View className="w-10 h-1.5 rounded-md bg-gray-300" />
              </View>

              {/* Title row */}
              <View className="flex-row items-center justify-center py-4 pb-2">
                <Text style={{ fontFamily: 'Lexend-Bold', fontSize: 20 }}>Service Crew</Text>

                <TouchableOpacity onPress={closeSheet} className="absolute right-3 top-1 p-2">
                  <Text className="text-lg text-gray-700">✕</Text>
                </TouchableOpacity>
              </View>

              {/* Scrollable content */}
              <ScrollView contentContainerStyle={{ paddingHorizontal: 18, paddingBottom: 24 }}>
                <Text style={{ fontFamily: 'Lexend-Medium', marginBottom: 6, fontSize: 14 }} className="text-center py-2">
                  Posted by: Jollibee
                </Text>

                <View className="flex-row justify-between space-x-4">
                  <View className="flex-1 pr-2">
                    <Text style={{ fontFamily: 'Lexend-Medium', fontSize: 16 }} className="text-[#5b21b6] font-semibold mb-2">
                      Qualifications
                    </Text>

                    <Text className="mb-2">• Lorem ipsum.</Text>
                    <Text className="mb-2">• Lorem ipsum.</Text>
                    <Text className="mb-2">• Lorem ipsum.</Text>
                  </View>

                  <View className="flex-1 pl-2">
                    <Text style={{ fontFamily: 'Lexend-Medium', fontSize: 16 }} className="text-[#5b21b6] font-semibold mb-2">
                      Key Responsibilities
                    </Text>
                    <View className="mb-2">
                      <Text>• Lorem ipsum.</Text>
                    </View>
                    <View className="mb-2">
                      <Text>• Lorem ipsum.</Text>
                    </View>
                    <View className="mb-2">
                      <Text>• Lorem ipsum.</Text>
                    </View>
                  </View>
                </View>

                <View className="h-3" />

                <View className="flex-row justify-between space-x-4">
                  <View className="flex-1 pr-2">
                    <Text style={{ fontFamily: 'Lexend-Medium', fontSize: 16 }} className="text-[#5b21b6] font-semibold mb-2">
                      Skills
                    </Text>

                    <Text className="mb-2">• Lorem ipsum.</Text>
                    <Text className="mb-2">• Lorem ipsum.</Text>
                    <Text className="mb-2">• Lorem ipsum.</Text>
                  </View>

                  <View className="flex-1 pl-2">
                    <Text style={{ fontFamily: 'Lexend-Medium', fontSize: 16 }} className="text-[#5b21b6] font-semibold mb-2">
                      Job Type
                    </Text>
                    <View className="mb-2">
                      <Text>• Lorem ipsum.</Text>
                    </View>
                    <View className="mb-2">
                      <Text>• Lorem ipsum.</Text>
                    </View>
                    <View className="mb-2">
                      <Text>• Lorem ipsum.</Text>
                    </View>
                  </View>
                </View>

                <View className="h-4" />

                <Text style={{ fontFamily: 'Lexend-Medium', fontSize: 16 }} className="text-[#5b21b6] font-semibold mt-1 mb-2">
                  Experience
                </Text>
                <Text>No experience required.</Text>

                <View style={{ height: 32 }} />
              </ScrollView>

              {/* Footer */}
              <View className="flex-row justify-evenly items-center jpx-3 py-3">
                <TouchableOpacity className="bg-[#1f6feb] px-4 py-3 rounded-lg items-center">
                  <Text className="text-white font-bold" style={{ fontFamily: 'Lexend-Bold' }}>
                    100% match for you!
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={closeSheet} className="ml-3 py-2 px-2">
                  <Text className="text-gray-800 font-bold">Tap to view less</Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}