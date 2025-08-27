import React, { createContext, useContext, useState, ReactNode } from "react";

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  middleInitial?: string;
  email: string;
  location?: string;
  skills: string[];
  experience?: string;
  degree?: string;
}

interface UserContextType {
  user: UserProfile | null;
  setUser: (user: UserProfile) => void;
  updateUser: (updates: Partial<UserProfile>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUserState] = useState<UserProfile | null>({
    id: 'demo-user-1',
    firstName: 'Michael',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    location: 'Naga City, Philippines',
    skills: ['React Native', 'JavaScript', 'TypeScript', 'UI/UX Design'],
    experience: '2 years as a Frontend Developer at TechCorp',
    degree: 'Bachelor of Science in Computer Science',
  });

  const setUser = (userData: UserProfile) => {
    setUserState(userData);
  };

  const updateUser = (updates: Partial<UserProfile>) => {
    if (user) {
      setUserState({ ...user, ...updates });
    }
  };

  const value: UserContextType = {
    user,
    setUser,
    updateUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
