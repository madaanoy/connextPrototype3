import React from "react";
import { useRouter } from "expo-router";
import { useJobs } from "../context/JobOpeningContext";
import JobForm from "../components/employer/JobForm"

export default function CreateOpening() {
  const { addJob } = useJobs();
  const router = useRouter();

  const handleSubmit = (formData: any) => {
    addJob(formData);
    router.push("/employer-home");
  };

  return <JobForm mode="create" onSubmit={handleSubmit} />;
}
