import React from "react";
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
} from "react-native";
import { Card } from "react-native-paper";
import companyLogo from "../../../assets/images/placeholderImage.png";
import {
  BriefcaseBusiness,
  PhilippinePeso,
  MapPin,
  Expand,
  Minimize,
} from "lucide-react-native";
import { useJobProspects } from "../../context/JobProspectsContext";
import {
  useJobs,
  JobPosting as EmployerJobPosting,
} from "../../context/JobOpeningContext";
import { useUser } from "../../context/UserContext";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

// Helper function to convert EmployerJobPosting to JobProspects format
// Helper function to convert EmployerJobPosting to JobProspects format
const convertToJobProspectsFormat = (
  employerJob: EmployerJobPosting,
  index: number
) => {
  // ensure id is a number
  const idNum =
    typeof employerJob.id === "number"
      ? employerJob.id
      : parseInt(String(employerJob.id || index), 10);

  const salary =
    employerJob.salaryMin && employerJob.salaryMax
      ? `PHP ${employerJob.salaryMin} - ${employerJob.salaryMax}/month`
      : employerJob.salaryMin
        ? `PHP ${employerJob.salaryMin}+/month`
        : employerJob.salaryMax
          ? `Up to PHP ${employerJob.salaryMax}/month`
          : "Salary not disclosed";

  // Calculate match percentage based on job details (simple algorithm)
  const calculateMatch = () => {
    let score = 70; // Base score
    if (employerJob.education) score += 5;
    if (employerJob.experience) score += 10;
    if (employerJob.salaryMin) score += 5;
    if ((employerJob.description || "").length > 100) score += 5;
    if ((employerJob.responsibilities || "").length > 100) score += 5;
    return Math.min(95, score);
  };

  const matchPercentage = calculateMatch();

  return {
    id: idNum,
    company: employerJob.companyName ?? "Unknown Company",
    position: employerJob.jobTitle ?? "Job title not specified",
    salary,
    location: employerJob.location ?? "Location not specified",
    match: `${matchPercentage}% match for you`,
    description: employerJob.description ?? "No description provided",
    modalTitle: employerJob.jobTitle ?? "Job details",
    modalMatch: `${matchPercentage}% match for you!`,
    qualifications: employerJob.education
      ? [employerJob.education]
      : ["Requirements not specified"],

    responsibilities: Array.isArray(employerJob.responsibilities)
      ? employerJob.responsibilities
      : typeof employerJob.responsibilities === "string"
        ? employerJob.responsibilities
            .split("\n")
            .filter((r: string) => r.trim())
        : [],

    skills: Array.isArray(employerJob.skills)
      ? employerJob.skills
      : typeof employerJob.skills === "string"
        ? employerJob.skills.split(",").map((s) => s.trim())
        : [],

    jobType: employerJob.jobType
      ? [
          employerJob.jobType === "full-time"
            ? "Full-time position"
            : employerJob.jobType === "part-time"
              ? "Part-time position"
              : "Job type not specified",
          "8-hour shifts",
          "Flexible schedule",
        ]
      : ["Job type not specified"],

    experience:
      employerJob.experience ?? "Experience requirements not specified",
  };
};

// Static job postings (fallback when no employer jobs exist)
const staticJobPostings = [
  {
    id: 1001,
    company: "Jollibee",
    position: "Clean Up Crew",
    salary: "PHP 40,000 - 55,000/month",
    location: "Ateneo Ave, Naga City, 4400",
    match: "80% match for you",
    description:
      "The Cleanup Crew Member is responsible for maintaining a clean and safe environment in the Jollibee restaurant.\n\nThis includes cleaning dining areas, restrooms, kitchen spaces, and outdoor areas, ensuring that high standards of hygiene and safety are met throughout the restaurant.",
    modalTitle: "Clean Up Crew",
    modalMatch: "80% match for you!",
    qualifications: [
      "High school diploma or equivalent",
      "Physical ability to lift up to 25kg",
      "Attention to detail and cleanliness",
    ],
    responsibilities: [
      "Clean dining areas and restrooms",
      "Sanitize kitchen equipment",
      "Maintain outdoor cleanliness",
    ],
    skills: ["Time management", "Physical stamina", "Team collaboration"],
    jobType: ["Full-time position", "8-hour shifts", "Rotating schedule"],
    experience: "No experience required.",
  },
  {
    id: 1002,
    company: "McDonald's",
    position: "Service Crew",
    salary: "PHP 35,000 - 50,000/month",
    location: "SM City Naga, Triangulo, Naga City",
    match: "92% match for you",
    description:
      "Join our team as a Service Crew member where you'll be the face of McDonald's, serving customers with a smile and ensuring their dining experience is exceptional.\n\nYou'll take orders, prepare food, and maintain the highest standards of customer service in our fast-paced environment.",
    modalTitle: "Service Crew",
    modalMatch: "92% match for you!",
    qualifications: [
      "High school graduate",
      "Good communication skills",
      "Customer service orientation",
    ],
    responsibilities: [
      "Take customer orders accurately",
      "Prepare and serve food items",
      "Handle cash transactions",
    ],
    skills: ["Communication skills", "Multitasking ability", "Cash handling"],
    jobType: ["Full-time/Part-time", "Flexible shifts", "Weekend availability"],
    experience: "Fresh graduates welcome.",
  },
];

export default function JobPostingCard() {
  const { saveJob } = useJobProspects();
  const { jobs: employerJobs, addApplicant } = useJobs();
  const { user } = useUser();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [currentJobIndex, setCurrentJobIndex] = React.useState(0);

  // Convert employer jobs to job prospects format and combine with static jobs
  const allJobPostings = React.useMemo(() => {
    const activeEmployerJobs = employerJobs
      .filter((job) => job.isActive) // Only show active jobs
      .map((job, index) => convertToJobProspectsFormat(job, index));

    // Combine employer jobs with static jobs
    return [...activeEmployerJobs, ...staticJobPostings];
  }, [employerJobs]);

  const show = () => setModalVisible(true);
  const hide = () => setModalVisible(false);

  // Get current job posting
  const currentJob = allJobPostings[currentJobIndex];

  // If no jobs available, show placeholder
  if (!currentJob) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text
          style={{ fontFamily: "Lexend-Regular" }}
          className="text-gray-500 text-lg"
        >
          No job postings available
        </Text>
      </SafeAreaView>
    );
  }

  // Bottom sheet config
  const maxHeightPercent = 0.8;
  const sheetHeight = SCREEN_HEIGHT * maxHeightPercent;

  const translateY = React.useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const sheetPan = React.useRef(new Animated.Value(0)).current;

  // Card horizontal swipe config
  const cardPan = React.useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

  // Keep track of the current offset for smooth dragging
  const cardOffset = React.useRef({ x: 0, y: 0 });

  // animated styles for visual feedback
  const rotate = cardPan.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ["-10deg", "0deg", "10deg"],
    extrapolate: "clamp",
  });

  const opacity = cardPan.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [0.7, 1, 0.7],
    extrapolate: "clamp",
  });

  const scale = cardPan.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [0.98, 1, 0.98],
    extrapolate: "clamp",
  });

  // callbacks for swipe actions
  const onSwipeRight = React.useCallback(
    (jobIndex: number) => {
      const jobToSave = allJobPostings[jobIndex];
      console.log(
        "Swiped RIGHT - Liked job:",
        jobToSave.company,
        jobToSave.position,
        "Index:",
        jobIndex
      );
      saveJob(jobToSave);

      // Create applicant object
      if (!user) {
        console.log("User not logged in - cannot create applicant");
        return;
      }

      const applicant = {
        id: Date.now().toString(),
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        appliedAt: new Date(),
      };

      // Only add applicant if this is an employer-created job (ID < 1000)
      if (jobToSave.id < 1000) {
        addApplicant(jobToSave.id.toString(), applicant);
      }

      // Move to next job posting
      setCurrentJobIndex(
        (prevIndex) => (prevIndex + 1) % allJobPostings.length
      );
    },
    [saveJob, addApplicant, allJobPostings, user]
  );

  const onSwipeLeft = React.useCallback(
    (jobIndex: number) => {
      const jobToDismiss = allJobPostings[jobIndex];
      console.log(
        "Swiped LEFT - Dismissed job:",
        jobToDismiss.company,
        jobToDismiss.position,
        "Index:",
        jobIndex
      );

      // Move to next job posting
      setCurrentJobIndex(
        (prevIndex) => (prevIndex + 1) % allJobPostings.length
      );
    },
    [allJobPostings]
  );

  // Add useEffect to track index changes
  React.useEffect(() => {
    console.log("Current job index:", currentJobIndex);
    console.log("Current job:", allJobPostings[currentJobIndex]?.company);
    console.log("Total jobs available:", allJobPostings.length);
  }, [currentJobIndex, allJobPostings]);

  // PanResponder for the card (horizontal)
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
              if (toRight) onSwipeRight(currentJobIndex);
              else onSwipeLeft(currentJobIndex);

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
        onPanResponderTerminate: () => {
          Animated.spring(cardPan, {
            toValue: { x: 0, y: 0 },
            friction: 6,
            useNativeDriver: false,
          }).start();
        },
      }),
    [currentJobIndex, onSwipeRight, onSwipeLeft]
  );

  // PanResponder for the bottom sheet (vertical)
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
          Animated.spring(sheetPan, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
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

  const translateYStyle = {
    transform: [{ translateY: Animated.add(translateY, sheetPan) }],
  };

  // card animated style
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
        style={[{ margin: 10, borderRadius: 15 }, cardAnimatedStyle]}
        {...cardPanResponder.panHandlers}
      >
        <Card style={{ borderRadius: 15, backgroundColor: "#6C63FF" }}>
          <Card.Content>
            {/* Row: logo + posted by */}
            <View className="flex-row items-center space-x-3">
              <Image
                source={companyLogo}
                className="w-12 h-12 rounded-full"
                style={{ resizeMode: "cover" }}
              />
              <View className="ml-2">
                <Text
                  style={{ fontFamily: "Lexend-Bold" }}
                  className="text-white text-xs"
                >
                  Posted by:
                </Text>
                <Text
                  style={{ fontFamily: "Lexend-Bold" }}
                  className="text-white text-2xl"
                >
                  {currentJob.company}
                </Text>
              </View>
            </View>

            <View className="py-4 px-2">
              <View className="flex-row items-center space-x-2 mb-2">
                <BriefcaseBusiness size={20} color={"white"} />
                <Text
                  style={{ fontFamily: "Lexend-Bold" }}
                  className="text-white text-xl ml-2"
                >
                  {currentJob.position}
                </Text>
              </View>

              <View className="flex-row items-center space-x-2 mb-2">
                <PhilippinePeso size={20} color={"white"} />
                <Text
                  style={{ fontFamily: "Lexend-Bold" }}
                  className="text-white text-lg ml-2"
                >
                  {currentJob.salary}
                </Text>
              </View>

              <View className="flex-row items-center space-x-2 mb-2">
                <MapPin size={20} color={"white"} />
                <Text
                  style={{ fontFamily: "Lexend-Medium" }}
                  className="text-white text-lg ml-2"
                >
                  {currentJob.location}
                </Text>
              </View>

              <View className="border-b border-gray-300 my-5" />

              <View>
                <Text
                  style={{ fontFamily: "Lexend-Regular" }}
                  className="text-white text-base text-justify"
                >
                  {currentJob.description}
                </Text>
              </View>

              <View className="flex-row items-center justify-evenly py-3 mt-5">
                <Text
                  style={{ fontFamily: "Lexend-Regular" }}
                  className="px-3 py-2 bg-slate-100 rounded-xl text-[#1572DB]"
                >
                  {currentJob.match}
                </Text>

                <TouchableOpacity
                  className="flex-row items-center"
                  onPress={show}
                >
                  <Text
                    style={{
                      fontFamily: "Lexend-Regular",
                      textDecorationLine: "underline",
                    }}
                    className="text-white"
                  >
                    Tap to view more
                  </Text>

                  <View className="pl-3">
                    <Expand size={20} color={"white"} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Card.Content>
        </Card>
      </Animated.View>

      {/* Bottom Sheet Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="none"
        onRequestClose={closeSheet}
      >
        <View className="flex-1 justify-end">
          {/* Backdrop */}
          <Pressable
            onPress={closeSheet}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.45)",
            }}
          />

          <Animated.View
            style={[
              translateYStyle,
              {
                height: sheetHeight - 100,
                backgroundColor: "white",
                borderTopLeftRadius: 18,
                borderTopRightRadius: 18,
                overflow: "hidden",
              },
            ]}
          >
            <SafeAreaView className="flex-1">
              {/* Drag handle */}
              <View
                {...sheetPanResponder.panHandlers}
                className="items-center pt-2 pb-1"
              >
                <View className="w-10 h-1.5 rounded-md bg-gray-300" />
              </View>

              {/* Title row */}
              <View className="flex-row items-center justify-center py-4 pb-2">
                <Text style={{ fontFamily: "Lexend-Bold", fontSize: 20 }}>
                  {currentJob.modalTitle}
                </Text>

                <TouchableOpacity
                  onPress={closeSheet}
                  className="absolute right-3 top-1 p-2"
                >
                  <Text className="text-lg text-gray-700">✕</Text>
                </TouchableOpacity>
              </View>

              {/* Scrollable content */}
              <ScrollView
                contentContainerStyle={{
                  paddingHorizontal: 18,
                  paddingBottom: 24,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Lexend-Medium",
                    marginBottom: 6,
                    fontSize: 14,
                  }}
                  className="text-center py-2"
                >
                  Posted by: {currentJob.company}
                </Text>

                <View className="flex-row justify-between space-x-4">
                  <View className="flex-1 pr-2">
                    <Text
                      style={{ fontFamily: "Lexend-Medium", fontSize: 16 }}
                      className="text-[#5b21b6] font-semibold mb-2"
                    >
                      Qualifications
                    </Text>

                    {currentJob.qualifications.map((qual, index) => (
                      <Text
                        style={{ fontFamily: "Poppins-Regular" }}
                        key={index}
                        className="my-2"
                      >
                        • {qual}
                      </Text>
                    ))}
                  </View>

                  <View className="flex-1 pl-2">
                    <Text
                      style={{ fontFamily: "Lexend-Medium", fontSize: 16 }}
                      className="text-[#5b21b6] font-semibold mb-2"
                    >
                      Key Responsibilities
                    </Text>
                    {currentJob.responsibilities.map((resp, index) => (
                      <View key={index} className="my-2">
                        <Text style={{ fontFamily: "Poppins-Regular" }}>
                          • {resp}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>

                <View className="h-3" />

                <View className="flex-row justify-between space-x-4">
                  <View className="flex-1 pr-2">
                    <Text
                      style={{ fontFamily: "Lexend-Medium", fontSize: 16 }}
                      className="text-[#5b21b6] font-semibold mb-2"
                    >
                      Skills
                    </Text>

                    {currentJob.skills.map((skill: string, index: number) => (
                      <Text
                        style={{ fontFamily: "Poppins-Regular" }}
                        key={index}
                        className="my-2"
                      >
                        • {skill}
                      </Text>
                    ))}
                  </View>

                  <View className="flex-1 pl-2">
                    <Text
                      style={{ fontFamily: "Lexend-Medium", fontSize: 16 }}
                      className="text-[#5b21b6] font-semibold mb-2"
                    >
                      Job Type
                    </Text>
                    {currentJob.jobType.map((type, index) => (
                      <View key={index} className="my-2">
                        <Text style={{ fontFamily: "Poppins-Regular" }}>
                          • {type}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>

                <View className="h-4" />

                <Text
                  style={{ fontFamily: "Lexend-Medium", fontSize: 16 }}
                  className="text-[#5b21b6] font-semibold mt-1 mb-2"
                >
                  Experience
                </Text>
                <Text
                  style={{ fontFamily: "Poppins-Regular" }}
                  className="my-2"
                >
                  {currentJob.experience}
                </Text>

                <View style={{ height: 32 }} />
              </ScrollView>

              {/* Footer */}
              <View className="flex-row justify-evenly items-center jpx-3 py-3">
                <TouchableOpacity className="bg-[#1f6feb] px-4 py-3 rounded-lg items-center">
                  <Text
                    style={{ fontFamily: "Lexend-Bold" }}
                    className="text-white"
                  >
                    {currentJob.modalMatch}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={closeSheet}
                  className="flex-row ml-3 py-2 px-2"
                >
                  <Text className="text-gray-800 font-bold px-2">
                    Tap to view less
                  </Text>
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