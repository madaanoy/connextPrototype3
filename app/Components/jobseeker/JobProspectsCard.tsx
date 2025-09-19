import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { Card } from "react-native-paper";
import React from "react";
import { useJobProspects } from "../../context/JobProspectsContext";
import { Trash2, BriefcaseBusiness, PhilippinePeso, MapPin } from "lucide-react-native";
import { useUser } from "../../context/UserContext";
import { useJobs } from "../../context/JobOpeningContext";
import companyLogo from "../../../assets/images/placeholderImage.png";

export default function JobProspectsCard() {
  const { savedJobs, removeJob, applyToJob, hasAppliedToJob } = useJobProspects();
  const { user } = useUser();
  const { addApplicant } = useJobs();

  React.useEffect(() => {
    console.log("JobProspectsCard - savedJobs count:", savedJobs.length);
    console.log(
      "JobProspectsCard - savedJobs:",
      savedJobs.map((job) => `${job.company} - ${job.position} (ID: ${job.id})`)
    );
  }, [savedJobs]);

  return (
    <ScrollView className="px-2 py-2">
      {savedJobs.length === 0 ? (
        <Text
          style={{ fontFamily: "Poppins-Regular" }}
          className="text-center text-gray-500 py-6"
        >
          No saved jobs yet. Swipe right on job postings to save them.
        </Text>
      ) : (
        savedJobs.map((job) => (
          <Card key={`saved-job-${job.id}`} className="my-2">
            <Card.Content className="bg-[#6C63FF] rounded-lg p-4">
              <View className="flex-row justify-between">
                <View className="flex-row items-center gap-2">
                  <Image
                    source={companyLogo}
                    className="w-12 h-12 rounded-full"
                    style={{ resizeMode: "cover" }}
                  />
                  <View>
                    <Text
                      style={{ fontFamily: "Lexend-Regular" }}
                      className="text-white text-xs"
                    >
                      Posted by:
                    </Text>
                    <Text
                      style={{ fontFamily: "Lexend-Bold" }}
                      className="text-white text-lg"
                    >
                      {job.company}
                    </Text>
                  </View>
                </View>
                <View>
                  <Text
                    style={{ fontFamily: "Lexend-Bold" }}
                    className="bg-white px-3 py-1 rounded-full text-blue-600 text-xs"
                  >
                    {job.match}
                  </Text>
                </View>
              </View>

              <View className="mt-3">
                <Text
                  style={{ fontFamily: "Lexend-Bold" }}
                  className="text-white text-xl mb-2"
                >
                  {job.position}
                </Text>

                <View className="flex-row items-center gap-2 mb-1">
                  <PhilippinePeso size={16} color="white" />
                  <Text
                    style={{ fontFamily: "Lexend-Bold" }}
                    className="text-white text-base"
                  >
                    {job.salary}
                  </Text>
                </View>

                <View className="flex-row items-center gap-2 mb-3">
                  <MapPin size={16} color="white" />
                  <Text
                    style={{ fontFamily: "Lexend-Medium" }}
                    className="text-white text-base"
                  >
                    {job.location}
                  </Text>
                </View>
              </View>

              <View className="flex-row justify-between items-center">
                <Text
                  style={{ fontFamily: "Lexend-Regular" }}
                  className="text-white text-sm"
                >
                  Posted 1 week ago
                </Text>

                {hasAppliedToJob(job.id) ? (
                  <TouchableOpacity disabled={true} className="px-4 py-2 rounded-lg bg-gray-400">
                    <Text
                      style={{ fontFamily: "Lexend-Bold" }}
                      className="text-white"
                    >
                      Already applied
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      if (!user) {
                        console.log("User not logged in");
                        return;
                      }
                      const applicant = {
                        id: Date.now().toString(),
                        name: `${user.firstName} ${user.lastName}`,
                        email: user.email,
                        appliedAt: new Date(),
                      };
                      addApplicant(job.id.toString(), applicant);
                      applyToJob(job.id);
                    }}
                    className="px-6 py-2 rounded-lg bg-[#154588]"
                  >
                    <Text
                      style={{ fontFamily: "Lexend-Bold" }}
                      className="text-white text-center"
                    >
                      Apply
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </Card.Content>
          </Card>
        ))
      )}
    </ScrollView>
  );
}
