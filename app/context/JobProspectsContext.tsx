import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface JobPosting {
  id: number;
  company: string;
  position: string;
  salary: string;
  location: string;
  match: string;
  description: string;
  modalTitle: string;
  modalMatch: string;
  qualifications: string[];
  responsibilities: string[];
  skills: string[];
  jobType: string[];
  experience: string;
}

interface JobProspectsContextType {
  savedJobs: JobPosting[];
  appliedJobs: number[]; // Track job IDs that user has applied to
  saveJob: (job: JobPosting) => void;
  removeJob: (jobId: number) => void;
  isJobSaved: (jobId: number) => boolean;
  applyToJob: (jobId: number) => void;
  hasAppliedToJob: (jobId: number) => boolean;
}

const JobProspectsContext = createContext<JobProspectsContextType | undefined>(undefined);

export const JobProspectsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [savedJobs, setSavedJobs] = useState<JobPosting[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<number[]>([]);

  const saveJob = (job: JobPosting) => {
    console.log('=== SAVE JOB DEBUG ===');
    console.log('Attempting to save job:', job.company, job.position, 'ID:', job.id);
    console.log('Current savedJobs before save:', savedJobs.map(j => `${j.company} (ID: ${j.id})`));
    
    setSavedJobs(prevJobs => {
      // Check if job already exists
      const existingJob = prevJobs.find(savedJob => savedJob.id === job.id);
      if (existingJob) {
        console.log('Job already exists in saved jobs:', existingJob.company, existingJob.position);
        console.log('Current saved jobs IDs:', prevJobs.map(j => j.id));
        return prevJobs;
      }
      
      const newSavedJobs = [...prevJobs, job];
      console.log('Job saved successfully! New saved jobs:', newSavedJobs.map(j => `${j.company} (ID: ${j.id})`));
      return newSavedJobs;
    });
  };

  const removeJob = (jobId: number) => {
    console.log('Removing job with ID:', jobId);
    setSavedJobs(prevJobs => {
      const filtered = prevJobs.filter(job => job.id !== jobId);
      console.log('Jobs after removal:', filtered.map(j => `${j.company} (ID: ${j.id})`));
      return filtered;
    });
  };

  const isJobSaved = (jobId: number) => {
    const saved = savedJobs.some(job => job.id === jobId);
    console.log(`Job ${jobId} is saved:`, saved);
    return saved;
  };

  const applyToJob = (jobId: number) => {
    console.log('Applying to job with ID:', jobId);
    setAppliedJobs(prevAppliedJobs => {
      // Check if already applied
      if (prevAppliedJobs.includes(jobId)) {
        console.log('Already applied to job:', jobId);
        return prevAppliedJobs;
      }
      
      const newAppliedJobs = [...prevAppliedJobs, jobId];
      console.log('Successfully applied to job. Applied jobs:', newAppliedJobs);
      return newAppliedJobs;
    });
  };

  const hasAppliedToJob = (jobId: number) => {
    const applied = appliedJobs.includes(jobId);
    console.log(`Job ${jobId} is applied:`, applied);
    return applied;
  };

  // Debug effect to track savedJobs changes
  React.useEffect(() => {
    console.log('=== SAVED JOBS STATE CHANGED ===');
    console.log('Total saved jobs:', savedJobs.length);
    console.log('Saved jobs list:', savedJobs.map(job => `${job.company} - ${job.position} (ID: ${job.id})`));
  }, [savedJobs]);

  // Debug effect to track appliedJobs changes
  React.useEffect(() => {
    console.log('=== APPLIED JOBS STATE CHANGED ===');
    console.log('Total applied jobs:', appliedJobs.length);
    console.log('Applied jobs list:', appliedJobs);
  }, [appliedJobs]);

  return (
    <JobProspectsContext.Provider value={{ 
      savedJobs, 
      appliedJobs,
      saveJob, 
      removeJob, 
      isJobSaved,
      applyToJob,
      hasAppliedToJob
    }}>
      {children}
    </JobProspectsContext.Provider>
  );
};

export const useJobProspects = () => {
  const context = useContext(JobProspectsContext);
  if (context === undefined) {
    throw new Error('useJobProspects must be used within a JobProspectsProvider');
  }
  return context;
};