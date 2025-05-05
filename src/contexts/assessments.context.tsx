"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth, useOrganization } from "@clerk/nextjs";
import { Assessment } from "@/types/assessment";
import { AssessmentService } from "@/services/assessments.service";

type AssessmentsContextType = {
  assessments: Assessment[];
  loading: boolean;
  fetchAssessments: () => Promise<void>;
};

const defaultContext: AssessmentsContextType = {
  assessments: [],
  loading: true,
  fetchAssessments: async () => {},
};

const AssessmentsContext = createContext<AssessmentsContextType>(defaultContext);

export const useAssessments = () => useContext(AssessmentsContext);

export const AssessmentsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useAuth();
  const { organization } = useOrganization();

  const fetchAssessments = async () => {
    setLoading(true);
    try {
      if (organization?.id) {
        const fetchedAssessments = await AssessmentService.getAssessmentsForOrganization(
          organization.id
        );
        setAssessments(fetchedAssessments);
      } else {
        setAssessments([]);
      }
    } catch (error) {
      console.error("Error fetching assessments:", error);
      setAssessments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (organization?.id) {
      fetchAssessments();
    }
  }, [organization?.id]);

  return (
    <AssessmentsContext.Provider
      value={{
        assessments,
        loading,
        fetchAssessments,
      }}
    >
      {children}
    </AssessmentsContext.Provider>
  );
}; 
