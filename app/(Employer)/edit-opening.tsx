import React from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useJobs } from "../context/JobOpeningContext";
import JobForm from "../components/employer/JobForm"

export default function EditOpening() {
  const router = useRouter();
  const { jobId } = useLocalSearchParams<{ jobId: string }>();
  const { jobs, updateJob } = useJobs();

  const job = jobs.find((j) => j.id === jobId);

  if (!job) return null;

  const handleSubmit = (formData: any) => {
    updateJob(job.id, formData);
    router.back();
  };

  return <JobForm mode="edit" initialValues={job} onSubmit={handleSubmit} />;
}
