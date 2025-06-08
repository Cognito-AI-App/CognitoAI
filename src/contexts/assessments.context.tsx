"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
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

const AssessmentsContext =
  createContext<AssessmentsContextType>(defaultContext);

export const useAssessments = () => useContext(AssessmentsContext);

export function AssessmentsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useAuth();
  const { organization } = useOrganization();

  const fetchAssessments = useCallback(async () => {
    setLoading(true);
    try {
      if (userId) {
        const fetchedAssessments =
          await AssessmentService.getAssessmentsForUserOrOrganization(
            userId,
            organization?.id || null
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
  }, [userId, organization?.id]);

  useEffect(() => {
    if (userId) {
      fetchAssessments();
    } else {
      setLoading(false);
      setAssessments([]);
    }
  }, [userId, organization?.id, fetchAssessments]);

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
}
