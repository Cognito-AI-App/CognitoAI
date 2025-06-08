import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { CreateNewsletterSubscriptionRequest } from "@/types/contact";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body: CreateNewsletterSubscriptionRequest = await request.json();

    // Validate required fields
    if (!body.email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const { data: existingSubscription } = await supabase
      .from("newsletter_subscription")
      .select("id, is_active")
      .eq("email", body.email)
      .single();

    if (existingSubscription) {
      if (existingSubscription.is_active) {
        return NextResponse.json(
          { message: "Email is already subscribed" },
          { status: 200 }
        );
      } else {
        // Reactivate subscription
        const { error } = await supabase
          .from("newsletter_subscription")
          .update({
            is_active: true,
            unsubscribed_at: null,
          })
          .eq("email", body.email);

        if (error) {
          console.error("Error reactivating subscription:", error);
<<<<<<< Updated upstream
          
return NextResponse.json(
=======
<<<<<<< HEAD

          return NextResponse.json(
=======
          
return NextResponse.json(
>>>>>>> ac82acc8749d2a121575bb19c95ac73a8063e21a
>>>>>>> Stashed changes
            { error: "Failed to subscribe" },
            { status: 500 }
          );
        }

        return NextResponse.json(
          { message: "Successfully resubscribed to newsletter" },
          { status: 200 }
        );
      }
    }

    // Insert new subscription
    const { data, error } = await supabase
      .from("newsletter_subscription")
      .insert([
        {
          email: body.email,
          source: body.source || "landing_page",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error inserting newsletter subscription:", error);
<<<<<<< Updated upstream
      
return NextResponse.json(
=======
<<<<<<< HEAD

      return NextResponse.json(
=======
      
return NextResponse.json(
>>>>>>> ac82acc8749d2a121575bb19c95ac73a8063e21a
>>>>>>> Stashed changes
        { error: "Failed to subscribe" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Successfully subscribed to newsletter",
        id: data.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in newsletter subscription API:", error);
<<<<<<< Updated upstream
    
return NextResponse.json(
=======
<<<<<<< HEAD

    return NextResponse.json(
=======
    
return NextResponse.json(
>>>>>>> ac82acc8749d2a121575bb19c95ac73a8063e21a
>>>>>>> Stashed changes
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
