import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Applicant {
  id: string;
  name: string;
  email: string;
  resumeUrl?: string;
  appliedAt: Date;
}

export interface JobPosting {
  id: string;
  jobTitle: string;
  jobType: "full-time" | "part-time";
  description: string;
  responsibilities: string;
  education: string;
  experience: string;
  salaryMin: string;
  salaryMax: string;
  datePosted: Date;
  isActive: boolean;
  applicants: Applicant[];
  companyName?: string;
  location?: string;
  skills: string;
}

interface JobContextType {
  jobs: JobPosting[];
  addJob: (
    job: Omit<JobPosting, "id" | "datePosted" | "isActive" | "applicants">
  ) => void;
  deleteJob: (id: string) => void;
  toggleJobStatus: (id: string) => void;
  updateJob: (
    id: string,
    updates: Partial<Omit<JobPosting, "id" | "datePosted" | "applicants">>
  ) => void;
  addApplicant: (jobId: string, applicant: Applicant) => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error("useJobs must be used within a JobProvider");
  }
  return context;
};

interface JobProviderProps {
  children: ReactNode;
}

export const JobProvider: React.FC<JobProviderProps> = ({ children }) => {
  const [jobs, setJobs] = useState<JobPosting[]>([]);

  const addJob = (
    jobData: Omit<JobPosting, "id" | "datePosted" | "isActive" | "applicants">
  ) => {
    const newJob: JobPosting = {
      ...jobData,
      id: Date.now().toString(),
      datePosted: new Date(),
      isActive: true,
      applicants: [],
    };
    setJobs((prevJobs) => [newJob, ...prevJobs]);
  };

  const deleteJob = (id: string) => {
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
  };

  const toggleJobStatus = (id: string) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === id ? { ...job, isActive: !job.isActive } : job
      )
    );
  };

  const updateJob = (
    id: string,
    updates: Partial<Omit<JobPosting, "id" | "datePosted" | "applicants">>
  ) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) => (job.id === id ? { ...job, ...updates } : job))
    );
  };

  const addApplicant = (jobId: string, applicant: Applicant) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId
          ? { ...job, applicants: [...job.applicants, applicant] }
          : job
      )
    );
  };

  const value: JobContextType = {
    jobs,
    addJob,
    deleteJob,
    toggleJobStatus,
    updateJob,
    addApplicant,
  };

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
};
