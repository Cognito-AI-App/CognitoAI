import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Assessment, AssessmentFormData, AssessmentResponse } from "@/types/assessment";

const supabase = createClientComponentClient();

export const AssessmentService = {
  getAllAssessments: async (): Promise<Assessment[]> => {
    try {
      const { data, error } = await supabase
        .from("assessment")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching assessments:", error);
        
return [];
      }

      return data || [];
    } catch (error) {
      console.error("Error in getAllAssessments:", error);
      
return [];
    }
  },

  getAssessment: async (id: number): Promise<Assessment | null> => {
    try {
      const { data, error } = await supabase
        .from("assessment")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching assessment:", error);
        
return null;
      }

      return data;
    } catch (error) {
      console.error("Error in getAssessment:", error);
      
return null;
    }
  },

  createAssessment: async (
    assessment: AssessmentFormData,
    user_id: string,
    organization_id: string | null
  ): Promise<Assessment | null> => {
    try {
      const { data, error } = await supabase
        .from("assessment")
        .insert({
          ...assessment,
          user_id,
          organization_id,
        })
        .select()
        .single();

      if (error) {
        console.error("Error creating assessment:", error);
        
return null;
      }

      return data;
    } catch (error) {
      console.error("Error in createAssessment:", error);
      
return null;
    }
  },

  updateAssessment: async (
    id: number,
    assessment: Partial<AssessmentFormData>
  ): Promise<Assessment | null> => {
    try {
      const { data, error } = await supabase
        .from("assessment")
        .update(assessment)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Error updating assessment:", error);
        
return null;
      }

      return data;
    } catch (error) {
      console.error("Error in updateAssessment:", error);
      
return null;
    }
  },

  deleteAssessment: async (id: number): Promise<boolean> => {
    try {
      const { error } = await supabase.from("assessment").delete().eq("id", id);

      if (error) {
        console.error("Error deleting assessment:", error);
        
return false;
      }

      return true;
    } catch (error) {
      console.error("Error in deleteAssessment:", error);
      
return false;
    }
  },

  getAssessmentsForOrganization: async (
    organizationId: string
  ): Promise<Assessment[]> => {
    try {
      const { data, error } = await supabase
        .from("assessment")
        .select("*")
        .eq("organization_id", organizationId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching organization assessments:", error);
        
return [];
      }

      return data || [];
    } catch (error) {
      console.error("Error in getAssessmentsForOrganization:", error);
      
return [];
    }
  },
  
  getAssessmentsForUser: async (userId: string): Promise<Assessment[]> => {
    try {
      const { data, error } = await supabase
        .from("assessment")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching user assessments:", error);
        
return [];
      }

      return data || [];
    } catch (error) {
      console.error("Error in getAssessmentsForUser:", error);
      
return [];
    }
  },
  
  getAssessmentsForUserOrOrganization: async (userId: string, organizationId: string | null): Promise<Assessment[]> => {
    try {
      let query = supabase
        .from("assessment")
        .select("*");
      
      if (organizationId) {
        query = query.or(`organization_id.eq.${organizationId},user_id.eq.${userId}`);
      } else {
        query = query.eq("user_id", userId);
      }
      
      const { data, error } = await query.order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching assessments:", error);
        
return [];
      }

      return data || [];
    } catch (error) {
      console.error("Error in getAssessmentsForUserOrOrganization:", error);
      
return [];
    }
  },

  // Assessment Response methods
  createAssessmentResponse: async (
    response: Partial<AssessmentResponse>
  ): Promise<AssessmentResponse | null> => {
    try {
      const { data, error } = await supabase
        .from("assessment_response")
        .insert(response)
        .select()
        .single();

      if (error) {
        console.error("Error creating assessment response:", error);
        
return null;
      }

      return data;
    } catch (error) {
      console.error("Error in createAssessmentResponse:", error);
      
return null;
    }
  },

  updateAssessmentResponse: async (
    id: number,
    response: Partial<AssessmentResponse>
  ): Promise<AssessmentResponse | null> => {
    try {
      const { data, error } = await supabase
        .from("assessment_response")
        .update(response)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Error updating assessment response:", error);
        
return null;
      }

      return data;
    } catch (error) {
      console.error("Error in updateAssessmentResponse:", error);
      
return null;
    }
  },

  getAssessmentResponsesForInterview: async (
    interviewId: string
  ): Promise<AssessmentResponse[]> => {
    try {
      const { data, error } = await supabase
        .from("assessment_response")
        .select("*")
        .eq("interview_id", interviewId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching assessment responses:", error);
        
return [];
      }

      return data || [];
    } catch (error) {
      console.error("Error in getAssessmentResponsesForInterview:", error);
      
return [];
    }
  },

  getAssessmentResponsesForEmail: async (
    email: string,
    interviewId: string
  ): Promise<AssessmentResponse[]> => {
    try {
      const { data, error } = await supabase
        .from("assessment_response")
        .select("*")
        .eq("email", email)
        .eq("interview_id", interviewId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching assessment responses for email:", error);
        
return [];
      }

      return data || [];
    } catch (error) {
      console.error("Error in getAssessmentResponsesForEmail:", error);
      
return [];
    }
  },
}; 
