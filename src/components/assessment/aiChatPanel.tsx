"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SendIcon, Trash2Icon, DownloadIcon } from "lucide-react";
import { CodingQuestion } from "@/types/codingQuestion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AIChatPanelProps {
  question: CodingQuestion;
  onApplyCode: (code: string) => void;
  questionIndex: number;
  currentCode: string;
}

const AIChatPanel: React.FC<AIChatPanelProps> = ({
  question,
  onApplyCode,
  questionIndex,
  currentCode,
}) => {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep messages in a ref for persistence across question changes
  const messagesMapRef = useRef<Map<number, Message[]>>(new Map());

  // Load messages for the current question from the map
  useEffect(() => {
    const existingMessages = messagesMapRef.current.get(questionIndex) || [];
    setMessages(existingMessages);
  }, [questionIndex]);

  // Initialize with system prompt for this question
  useEffect(() => {
    if (!messagesMapRef.current.has(questionIndex)) {
      const initialMessages: Message[] = [
        {
          role: "assistant",
          content: "I'm your coding assistant. Ask me specific questions about code implementation and I'll generate code to help you. I'll only provide code without explanations.",
        },
      ];
      messagesMapRef.current.set(questionIndex, initialMessages);
      setMessages(initialMessages);
    }
  }, [questionIndex]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Save messages to the map when they change
  useEffect(() => {
    if (messages.length > 0) {
      messagesMapRef.current.set(questionIndex, messages);
    }
  }, [messages, questionIndex]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input.trim(),
    };

    // Update messages immediately with user input
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      // Send to the API with current code for context
      const response = await fetch("/api/coding-assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages,
          currentCode: currentCode,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from AI");
      }

      const data = await response.json();
      
      // Add AI response to messages
      const aiMessage: Message = {
        role: "assistant",
        content: data.content,
      };
      
      setMessages([...updatedMessages, aiMessage]);
      messagesMapRef.current.set(questionIndex, [...updatedMessages, aiMessage]);
    } catch (error) {
      console.error("Error calling AI assistant:", error);
      
      // Add error message
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
      };
      
      setMessages([...updatedMessages, errorMessage]);
      messagesMapRef.current.set(questionIndex, [...updatedMessages, errorMessage]);
    } finally {
      setIsLoading(false);
      
      // Focus the input field after sending
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearHistory = () => {
    const initialMessages: Message[] = [
      {
        role: "assistant",
        content: "I'm your coding assistant. Ask me specific questions about code implementation and I'll generate code to help you. I'll only provide code without explanations.",
      },
    ];
    setMessages(initialMessages);
    messagesMapRef.current.set(questionIndex, initialMessages);
  };

  const handleApplyCode = () => {
    // Find the last AI message with code
    const lastAiMessage = [...messages]
      .reverse()
      .find(msg => msg.role === "assistant");
      
    if (lastAiMessage) {
      onApplyCode(lastAiMessage.content);
    }
  };

  return (
    <Card className="flex flex-col h-full">
      <div className="flex justify-between items-center p-3 border-b bg-slate-50">
        <h3 className="font-semibold">AI Coding Assistant</h3>
        <div className="flex items-center gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={handleClearHistory}
            title="Clear conversation history"
          >
            <Trash2Icon className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={handleApplyCode}
            title="Apply the last AI code to the editor"
          >
            <DownloadIcon className="h-4 w-4 mr-1" /> Apply Code
          </Button>
        </div>
      </div>
      
      <CardContent className="p-0 flex-1 flex flex-col">
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "assistant" ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === "assistant"
                    ? "bg-slate-100 text-slate-800"
                    : "bg-blue-500 text-white"
                }`}
              >
                <pre className="whitespace-pre-wrap break-words font-mono text-sm">
                  {message.content}
                </pre>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-3 bg-slate-100">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t mt-auto">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask for help with your code..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
            >
              <SendIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChatPanel; 
