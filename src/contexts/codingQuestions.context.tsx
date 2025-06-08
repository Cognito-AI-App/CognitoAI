"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useAuth, useOrganization } from "@clerk/nextjs";

import { CodingQuestion } from "@/types/codingQuestion";
import { CodingQuestionService } from "@/services/codingQuestions.service";

type CodingQuestionsContextType = {
  codingQuestions: CodingQuestion[];
  loading: boolean;
  fetchCodingQuestions: () => Promise<void>;
};

const defaultContext: CodingQuestionsContextType = {
  codingQuestions: [],
  loading: true,
  fetchCodingQuestions: async () => {},
};

const CodingQuestionsContext =
  createContext<CodingQuestionsContextType>(defaultContext);

export const useCodingQuestions = () => useContext(CodingQuestionsContext);

export function CodingQuestionsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [codingQuestions, setCodingQuestions] = useState<CodingQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useAuth();
  const { organization } = useOrganization();

  const fetchCodingQuestions = useCallback(async () => {
    setLoading(true);
    try {
      if (userId) {
        const questions =
          await CodingQuestionService.getQuestionsForUserOrOrganization(
            userId,
            organization?.id || null
          );
        setCodingQuestions(questions);
      } else {
        setCodingQuestions([]);
      }
    } catch (error) {
      console.error("Error fetching coding questions:", error);
      setCodingQuestions([]);
    } finally {
      setLoading(false);
    }
  }, [userId, organization?.id]);

  useEffect(() => {
    if (userId) {
      fetchCodingQuestions();
    } else {
      setLoading(false);
      setCodingQuestions([]);
    }
  }, [userId, organization?.id, fetchCodingQuestions]);

  return (
    <CodingQuestionsContext.Provider
      value={{
        codingQuestions,
        loading,
        fetchCodingQuestions,
      }}
    >
      {children}
    </CodingQuestionsContext.Provider>
  );
}
