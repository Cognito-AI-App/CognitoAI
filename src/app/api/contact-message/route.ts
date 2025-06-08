import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { CreateContactMessageRequest } from "@/types/contact";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body: CreateContactMessageRequest = await request.json();

    // Validate required fields
    if (!body.first_name || !body.last_name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Insert contact message into database
    const { data, error } = await supabase
      .from("contact_message")
      .insert([
        {
          first_name: body.first_name,
          last_name: body.last_name,
          email: body.email,
          company: body.company || null,
          phone: body.phone || null,
          subject: body.subject || null,
          message: body.message,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error inserting contact message:", error);
      
return NextResponse.json(
        { error: "Failed to submit message" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        message: "Message submitted successfully",
        id: data.id 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in contact message API:", error);
    
return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 
