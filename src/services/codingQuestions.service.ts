import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { CodingQuestion, CodingQuestionFormData } from "@/types/codingQuestion";

const supabase = createClientComponentClient();

export const CodingQuestionService = {
  getAllQuestions: async (): Promise<CodingQuestion[]> => {
    try {
      const { data, error } = await supabase
        .from("coding_question")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching coding questions:", error);

        return [];
      }

      return data || [];
    } catch (error) {
      console.error("Error in getAllQuestions:", error);

      return [];
    }
  },

  getQuestion: async (id: number): Promise<CodingQuestion | null> => {
    try {
      const { data, error } = await supabase
        .from("coding_question")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching coding question:", error);

        return null;
      }

      return data;
    } catch (error) {
      console.error("Error in getQuestion:", error);

      return null;
    }
  },

  createQuestion: async (
    question: CodingQuestionFormData,
    user_id: string,
    organization_id: string | null
  ): Promise<CodingQuestion | null> => {
    try {
      const { data, error } = await supabase
        .from("coding_question")
        .insert({
          ...question,
          user_id,
          organization_id,
        })
        .select()
        .single();

      if (error) {
        console.error("Error creating coding question:", error);

        return null;
      }

      return data;
    } catch (error) {
      console.error("Error in createQuestion:", error);

      return null;
    }
  },

  updateQuestion: async (
    id: number,
    question: Partial<CodingQuestionFormData>
  ): Promise<CodingQuestion | null> => {
    try {
      const { data, error } = await supabase
        .from("coding_question")
        .update(question)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Error updating coding question:", error);

        return null;
      }

      return data;
    } catch (error) {
      console.error("Error in updateQuestion:", error);

      return null;
    }
  },

  deleteQuestion: async (id: number): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from("coding_question")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting coding question:", error);

        return false;
      }

      return true;
    } catch (error) {
      console.error("Error in deleteQuestion:", error);

      return false;
    }
  },

  getQuestionsForOrganization: async (
    organizationId: string
  ): Promise<CodingQuestion[]> => {
    try {
      const { data, error } = await supabase
        .from("coding_question")
        .select("*")
        .eq("organization_id", organizationId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching organization questions:", error);

        return [];
      }

      return data || [];
    } catch (error) {
      console.error("Error in getQuestionsForOrganization:", error);

      return [];
    }
  },

  getQuestionsForUser: async (userId: string): Promise<CodingQuestion[]> => {
    try {
      const { data, error } = await supabase
        .from("coding_question")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching user questions:", error);

        return [];
      }

      return data || [];
    } catch (error) {
      console.error("Error in getQuestionsForUser:", error);

      return [];
    }
  },

  getQuestionsForUserOrOrganization: async (
    userId: string,
    organizationId: string | null
  ): Promise<CodingQuestion[]> => {
    try {
      let query = supabase.from("coding_question").select("*");

      if (organizationId) {
        query = query.or(
          `organization_id.eq.${organizationId},user_id.eq.${userId}`
        );
      } else {
        query = query.eq("user_id", userId);
      }

      const { data, error } = await query.order("created_at", {
        ascending: false,
      });

      if (error) {
        console.error("Error fetching questions:", error);

        return [];
      }

      return data || [];
    } catch (error) {
      console.error("Error in getQuestionsForUserOrOrganization:", error);

      return [];
    }
  },
};
