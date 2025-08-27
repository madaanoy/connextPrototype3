import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import React from "react";
import { useJobProspects } from "../../context/JobProspectsContext";
import { Trash2 } from "lucide-react-native";
import { useUser } from "../../context/UserContext";
import { useJobs } from "../../context/JobOpeningContext";

export default function JobProspectsCard() {
  const { savedJobs, removeJob } = useJobProspects();
  const { user } = useUser();
  const { addApplicant } = useJobs();

  // Add debugging
  React.useEffect(() => {
    console.log("JobProspectsCard - savedJobs count:", savedJobs.length);
    console.log(
      "JobProspectsCard - savedJobs:",
      savedJobs.map((job) => `${job.company} - ${job.position} (ID: ${job.id})`)
    );
  }, [savedJobs]);

  return (
    <ScrollView className="px-2 py-2">
      {/* Debug info 
      <View className="bg-yellow-100 p-2 mb-2 rounded">
        <Text style={{fontFamily: 'Poppins-Regular'}} className="text-xs">
          Debug: {savedJobs.length} saved jobs
        </Text>
        {savedJobs.map((job, index) => (
          <Text key={index} style={{fontFamily: 'Poppins-Regular'}} className="text-xs">
            {index + 1}. {job.company} - {job.position} (ID: {job.id})
          </Text>
        ))}
      </View> */}

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
            <Card.Content>
              <View className="flex-row justify-between items-center">
                <Text
                  style={{ fontFamily: "Lexend-Bold" }}
                  className="text-xl mb-1"
                >
                  {job.company}
                </Text>
                <TouchableOpacity onPress={() => removeJob(job.id)}>
                  <Trash2 size={20} color="#ff4444" />
                </TouchableOpacity>
              </View>
              <Text
                style={{ fontFamily: "Lexend-Medium" }}
                className="text-lg text-gray-700 mb-2"
              >
                {job.position}
              </Text>
              <Text
                style={{ fontFamily: "Lexend-Regular" }}
                className="text-gray-600 mb-1"
              >
                {job.salary}
              </Text>
              <Text
                style={{ fontFamily: "Lexend-Regular" }}
                className="text-gray-600 mb-2"
              >
                {job.location}
              </Text>
              <View className="items-center flex-row justify-between">
                <Text
                  style={{ fontFamily: "Lexend-Regular" }}
                  className="text-blue-600"
                >
                  {job.match}
                </Text>

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
                  }}
                >
                  <Text
                    style={{ fontFamily: "Lexend-Bold" }}
                    className="p-2 bg-[#154588] rounded-lg color-white"
                  >
                    Send Application
                  </Text>
                </TouchableOpacity>
              </View>
            </Card.Content>
          </Card>
        ))
      )}
    </ScrollView>
  );
}
