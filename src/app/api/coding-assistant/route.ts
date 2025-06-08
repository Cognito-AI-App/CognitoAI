import { NextResponse } from "next/server";
import OpenAI from "openai";
import {
  codingAssistantPrompt,
  generateSystemMessage,
} from "@/lib/prompts/codingAssistant";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, currentCode } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    // Create the system message with the user's current code for context
    const systemMessage = generateSystemMessage(currentCode || "");

    // Format messages for OpenAI
    const formattedMessages = [
      {
        role: "system",
        content: codingAssistantPrompt + systemMessage,
      },
      ...messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
    ];

    // Call OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: formattedMessages,
      temperature: 0.5, // Lower temperature for more deterministic coding responses
      max_tokens: 2048, // Adjust based on expected code length
    });

    // Extract the AI's response
    const aiResponse = response.choices[0]?.message?.content || "";

    return NextResponse.json({ content: aiResponse });
  } catch (error: any) {
    console.error("Error in coding assistant API:", error);
<<<<<<< Updated upstream
    
return NextResponse.json(
=======
<<<<<<< HEAD

    return NextResponse.json(
=======
    
return NextResponse.json(
>>>>>>> ac82acc8749d2a121575bb19c95ac73a8063e21a
>>>>>>> Stashed changes
      { error: error.message || "Failed to generate code" },
      { status: 500 }
    );
  }
}
