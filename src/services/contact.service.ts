import { createClient } from "@supabase/supabase-js";
import { 
  ContactMessage, 
  CreateContactMessageRequest,
  NewsletterSubscription,
  CreateNewsletterSubscriptionRequest 
} from "@/types/contact";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export class ContactService {
  static async createContactMessage(data: CreateContactMessageRequest): Promise<ContactMessage> {
    const { data: result, error } = await supabase
      .from("contact_message")
      .insert([
        {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          company: data.company || null,
          phone: data.phone || null,
          subject: data.subject || null,
          message: data.message,
        },
      ])
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create contact message: ${error.message}`);
    }

    return result;
  }

  static async getAllContactMessages(): Promise<ContactMessage[]> {
    const { data, error } = await supabase
      .from("contact_message")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch contact messages: ${error.message}`);
    }

    return data || [];
  }

  static async markAsRead(id: number): Promise<void> {
    const { error } = await supabase
      .from("contact_message")
      .update({ is_read: true })
      .eq("id", id);

    if (error) {
      throw new Error(`Failed to mark message as read: ${error.message}`);
    }
  }
}

export class NewsletterService {
  static async subscribe(data: CreateNewsletterSubscriptionRequest): Promise<NewsletterSubscription> {
    // Check if email already exists
    const { data: existing } = await supabase
      .from("newsletter_subscription")
      .select("id, is_active")
      .eq("email", data.email)
      .single();

    if (existing) {
      if (existing.is_active) {
        throw new Error("Email is already subscribed");
      } else {
        // Reactivate subscription
        const { data: result, error } = await supabase
          .from("newsletter_subscription")
          .update({ 
            is_active: true, 
            unsubscribed_at: null 
          })
          .eq("email", data.email)
          .select()
          .single();

        if (error) {
          throw new Error(`Failed to reactivate subscription: ${error.message}`);
        }

        return result;
      }
    }

    // Create new subscription
    const { data: result, error } = await supabase
      .from("newsletter_subscription")
      .insert([
        {
          email: data.email,
          source: data.source || "landing_page",
        },
      ])
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create subscription: ${error.message}`);
    }

    return result;
  }

  static async unsubscribe(email: string): Promise<void> {
    const { error } = await supabase
      .from("newsletter_subscription")
      .update({ 
        is_active: false, 
        unsubscribed_at: new Date().toISOString() 
      })
      .eq("email", email);

    if (error) {
      throw new Error(`Failed to unsubscribe: ${error.message}`);
    }
  }

  static async getAllSubscriptions(): Promise<NewsletterSubscription[]> {
    const { data, error } = await supabase
      .from("newsletter_subscription")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch subscriptions: ${error.message}`);
    }

    return data || [];
  }

  static async getActiveSubscriptions(): Promise<NewsletterSubscription[]> {
    const { data, error } = await supabase
      .from("newsletter_subscription")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch active subscriptions: ${error.message}`);
    }

    return data || [];
  }
} 
