export interface ContactMessage {
  id: number;
  created_at: string;
  first_name: string;
  last_name: string;
  email: string;
  company?: string;
  phone?: string;
  subject?: string;
  message: string;
  is_read: boolean;
  responded_at?: string;
  notes?: string;
}

export interface CreateContactMessageRequest {
  first_name: string;
  last_name: string;
  email: string;
  company?: string;
  phone?: string;
  subject?: string;
  message: string;
}

export interface NewsletterSubscription {
  id: number;
  created_at: string;
  email: string;
  is_active: boolean;
  unsubscribed_at?: string;
  source: string;
}

export interface CreateNewsletterSubscriptionRequest {
  email: string;
  source?: string;
}
