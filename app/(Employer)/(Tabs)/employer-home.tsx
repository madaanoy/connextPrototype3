import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pen, SortDesc } from "lucide-react-native";

import LogoAndNotif from "../../components/LogoAndNotif";
import GenericSearchBar from "../../components/GenericSearchBar";
import { useRouter } from "expo-router";
import JobOpeningCard from "../../components/employer/JobOpeningCard";
import { useJobs, JobPosting } from "../../context/JobOpeningContext";

export default function EmployerHome() {
  const router = useRouter();
  const { jobs } = useJobs();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "title">("newest");

  // Filter and sort jobs
  const filteredAndSortedJobs = React.useMemo(() => {
    let filtered = jobs;

    if (searchQuery.trim()) {
      filtered = jobs.filter(
        (job) =>
          job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.datePosted.getTime() - a.datePosted.getTime();
        case "oldest":
          return a.datePosted.getTime() - b.datePosted.getTime();
        case "title":
          return a.jobTitle.localeCompare(b.jobTitle);
        default:
          return 0;
      }
    });
  }, [jobs, searchQuery, sortBy]);

  const renderEmptyState = () => (
    <View className="flex-1 justify-center items-center py-16">
      <View className="w-24 h-24 bg-gray-100 rounded-full items-center justify-center mb-4">
        <Pen size={32} color="#9CA3AF" />
      </View>
      <Text
        style={{ fontFamily: "Lexend-Bold" }}
        className="text-gray-800 text-lg mb-2 text-center"

      >
        No job openings yet
      </Text>
      <Text
        className="text-gray-500 text-center mb-6 px-8"
        style={{ fontFamily: "Poppins-Regular" }}
      >
        Create your first job posting to start attracting candidates
      </Text>
    </View>
  );

  const renderJobStats = () => {
    const activeJobs = jobs.filter((job) => job.isActive).length;
    const inactiveJobs = jobs.filter((job) => !job.isActive).length;

    return (
      <View className="flex-row gap-4 mb-4">
        <View className="flex-1 bg-blue-50 p-3 rounded-lg border border-blue-100">
          <Text
            className="text-blue-800 text-2xl font-bold"
            style={{ fontFamily: "Lexend-Bold" }}
          >
            {activeJobs}
          </Text>
          <Text
            className="text-blue-600 text-sm"
            style={{ fontFamily: "Poppins-Regular" }}
          >
            Active Jobs
          </Text>
        </View>

        <View className="flex-1 bg-gray-50 p-3 rounded-lg border border-gray-200">
          <Text
            className="text-gray-800 text-2xl font-bold"
            style={{ fontFamily: "Lexend-Bold" }}
          >
            {inactiveJobs}
          </Text>
          <Text
            className="text-gray-600 text-sm"
            style={{ fontFamily: "Poppins-Regular" }}
          >
            Inactive Jobs
          </Text>
        </View>

        <View className="flex-1 bg-green-50 p-3 rounded-lg border border-green-100">
          <Text
            className="text-green-800 text-2xl font-bold"
            style={{ fontFamily: "Lexend-Bold" }}
          >
            {jobs.length}
          </Text>
          <Text
            className="text-green-600 text-sm"
            style={{ fontFamily: "Poppins-Regular" }}
          >
            Total Jobs
          </Text>
        </View>
      </View>
    );
  };

  const renderJobItem = ({ item }: { item: JobPosting }) => (
    <JobOpeningCard job={item} />
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <LogoAndNotif />

      <View className="px-4 py-2 flex-1">
        {/* Section Title + Search */}
        <View className="mb-4">
          <View className="flex-row items-center mb-3">
            <Text
              style={{ fontFamily: "Lexend-Bold" }}
              className="text-2xl text-[#37424F] mr-3 flex-1"
            >
              Your Openings
            </Text>

            {jobs.length > 0 && (
              <TouchableOpacity
                className="p-2 rounded-full bg-gray-100 active:bg-gray-200"
                onPress={() => {
                  const sortOptions = ["newest", "oldest", "title"] as const;
                  const currentIndex = sortOptions.indexOf(sortBy);
                  const nextIndex = (currentIndex + 1) % sortOptions.length;
                  setSortBy(sortOptions[nextIndex]);
                }}
              >
                <SortDesc size={20} color="#6B7280" />
              </TouchableOpacity>
            )}
          </View>

          {jobs.length > 0 && (
            <GenericSearchBar
              onSearchChange={setSearchQuery}
              placeholder="Search your job openings..."
            />
          )}
        </View>

        {/* Job Stats */}
        {jobs.length > 0 && renderJobStats()}

        {/* Main Body */}
        {jobs.length === 0 ? (
          renderEmptyState()
        ) : (
          <>
            {jobs.length > 1 && (
              <Text
                className="text-gray-500 text-sm mb-3 capitalize"
                style={{ fontFamily: "Poppins-Regular" }}
              >
                Sorted by:{" "}
                {sortBy === "newest"
                  ? "Newest"
                  : sortBy === "oldest"
                    ? "Oldest"
                    : "Title"}
              </Text>
            )}

            <FlatList
              data={filteredAndSortedJobs}
              keyExtractor={(item) => item.id}
              renderItem={renderJobItem}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 100 }} // give space for FAB
            />
          </>
        )}
      </View>

      {/* Floating Action Button */}
      <TouchableOpacity
        className="absolute bottom-6 right-6 rounded-2xl px-6 py-4 flex-row items-center shadow-lg bg-[#6C63FF] active:bg-[#574bff]"
        onPress={() => router.push("/create-opening")}
        style={{
          elevation: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
        }}
      >
        <Pen size={20} color="white" />
        <Text
          className="ml-3 text-white text-base font-bold"
          style={{ fontFamily: "Lexend-Bold" }}
        >
          Create Job Opening
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
