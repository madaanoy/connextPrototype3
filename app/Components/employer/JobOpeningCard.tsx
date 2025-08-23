import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { MoreVertical, Clock, DollarSign, Users } from 'lucide-react-native';
import { JobPosting, useJobs } from '../../context/JobOpeningContext';
import { useRouter } from "expo-router";

interface JobOpeningCardProps {
  job: JobPosting;
}

export default function JobOpeningCard({ job }: JobOpeningCardProps) {
  const { deleteJob, toggleJobStatus } = useJobs();
  const router = useRouter();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatSalary = () => {
    if (!job.salaryMin && !job.salaryMax) return null;
    if (job.salaryMin && job.salaryMax) {
      return `₱${job.salaryMin} - ₱${job.salaryMax}`;
    }
    return job.salaryMin ? `₱${job.salaryMin}+` : `Up to ₱${job.salaryMax}`;
  };

  const handleMoreOptions = () => {
    Alert.alert(
      'Job Options',
      'What would you like to do with this job posting?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: job.isActive ? 'Deactivate' : 'Activate',
          onPress: () => toggleJobStatus(job.id),
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Confirm Delete',
              'Are you sure you want to delete this job posting?',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: () => deleteJob(job.id) },
              ]
            );
          },
        },
      ]
    );
  };

  return (
    <View className="bg-white border border-gray-200 rounded-xl p-4 mb-4 shadow-sm">
      {/* Header */}
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-1 mr-3">
          <Text 
            className="text-lg font-bold text-gray-900 mb-1" 
            style={{ fontFamily: 'Lexend-Bold' }}
            numberOfLines={2}
          >
            {job.jobTitle}
          </Text>
          <View className="flex-row items-center">
            <View className={`px-2 py-1 rounded-full mr-2 ${
              job.jobType === 'full-time' ? 'bg-blue-100' : 'bg-green-100'
            }`}>
              <Text 
                className={`text-xs font-medium ${
                  job.jobType === 'full-time' ? 'text-blue-800' : 'text-green-800'
                }`}
                style={{ fontFamily: 'Lexend-Medium' }}
              >
                {job.jobType === 'full-time' ? 'Full-time' : 'Part-time'}
              </Text>
            </View>
            <View className={`px-2 py-1 rounded-full ${
              job.isActive ? 'bg-green-100' : 'bg-gray-100'
            }`}>
              <Text 
                className={`text-xs font-medium ${
                  job.isActive ? 'text-green-800' : 'text-gray-600'
                }`}
                style={{ fontFamily: 'Lexend-Medium' }}
              >
                {job.isActive ? 'Active' : 'Inactive'}
              </Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity 
          onPress={handleMoreOptions}
          className="p-1 rounded-full active:bg-gray-100"
        >
          <MoreVertical size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>

      {/* Description */}
      <Text 
        className="text-gray-600 text-sm mb-3 leading-5" 
        style={{ fontFamily: 'Poppins-Regular' }}
        numberOfLines={3}
      >
        {job.description}
      </Text>

      {/* Job Details */}
      <View className="space-y-2 mb-4">
        {(job.education || job.experience) && (
          <View className="flex-row items-center">
            <Users size={16} color="#6B7280" />
            <Text 
              className="text-gray-600 text-sm ml-2" 
              style={{ fontFamily: 'Poppins-Regular' }}
            >
              {job.education && job.experience 
                ? `${job.education} • ${job.experience}`
                : job.education || job.experience}
            </Text>
          </View>
        )}
        
        {formatSalary() && (
          <View className="flex-row items-center">
            <DollarSign size={16} color="#6B7280" />
            <Text 
              className="text-gray-600 text-sm ml-2" 
              style={{ fontFamily: 'Poppins-Regular' }}
            >
              {formatSalary()}
            </Text>
          </View>
        )}
      </View>

      {/* Footer */}
      <View className="flex-row justify-between items-center pt-3 border-t border-gray-100">
        <View className="flex-row items-center">
          <Clock size={14} color="#9CA3AF" />
          <Text 
            className="text-gray-500 text-xs ml-1" 
            style={{ fontFamily: 'Poppins-Regular' }}
          >
            Posted {formatDate(job.datePosted)}
          </Text>
        </View>
        
        <TouchableOpacity
          className="bg-[#6C63FF] px-3 py-2 rounded-lg flex-row items-center"
          onPress={() =>
            router.push({
              pathname: "/applicants-screen",
              params: { jobId: job.id },
            })
          }
        >
          <Text 
            className="text-white text-xs font-medium mr-2"
            style={{ fontFamily: 'Lexend-Medium' }}
          >
            View Applicants
          </Text>
          <View className="bg-white px-2 py-0.5 rounded-full">
            <Text 
              className="text-[#6C63FF] text-xs font-bold"
              style={{ fontFamily: 'Lexend-Bold' }}
            >
              {job.applicants.length}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
