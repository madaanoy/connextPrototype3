import React, { createContext, useContext, useState, ReactNode } from 'react';

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
  jobType: 'full-time' | 'part-time';
  description: string;
  responsibilities: string;
  education: string;
  experience: string;
  salaryMin: string;
  salaryMax: string;
  datePosted: Date;
  isActive: boolean;
  applicants: Applicant[];   // 🔹 NEW
}

interface JobContextType {
  jobs: JobPosting[];
  addJob: (job: Omit<JobPosting, 'id' | 'datePosted' | 'isActive' | 'applicants'>) => void;
  deleteJob: (id: string) => void;
  toggleJobStatus: (id: string) => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};

interface JobProviderProps {
  children: ReactNode;
}

export const JobProvider: React.FC<JobProviderProps> = ({ children }) => {
  const [jobs, setJobs] = useState<JobPosting[]>([]);

  const addJob = (
    jobData: Omit<JobPosting, 'id' | 'datePosted' | 'isActive' | 'applicants'>
  ) => {
    const newJob: JobPosting = {
      ...jobData,
      id: Date.now().toString(),
      datePosted: new Date(),
      isActive: true,
      applicants: [], // 🔹 initialize empty
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

  const value: JobContextType = {
    jobs,
    addJob,
    deleteJob,
    toggleJobStatus,
  };

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
};
