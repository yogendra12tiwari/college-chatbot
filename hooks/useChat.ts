"use client";

import { useEffect, useMemo, useState } from "react";

export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  imageUrl?: string;
  createdAt: string;
};

const createMessage = (role: ChatRole, content: string, imageUrl?: string): ChatMessage => ({
  id: crypto.randomUUID(),
  role,
  content,
  ...(imageUrl ? { imageUrl } : {}),
  createdAt: new Date().toISOString(),
});

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTopic, setActiveTopic] = useState<string>("Admissions");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("srmcem-chat-history");
    if (stored) {
      try {
        setMessages(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse messages from localStorage", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage when messages change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("srmcem-chat-history", JSON.stringify(messages));
    }
  }, [messages, isLoaded]);

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem("srmcem-chat-history");
  };

  const suggestions = useMemo(
    () => [
      "What programs are available at SRMCEM?",
      "Is SRMCEM affiliated with AKTU Lucknow?",
      "What are SRMCEM placement highlights?",
      "How do I apply for SRMCEM admissions?",
    ],
    [],
  );

  const sendMessage = async (content: string, imageUrl?: string) => {
    const trimmed = content.trim();
    if (!trimmed && !imageUrl || loading) return;

    const userMessage = createMessage("user", trimmed || "What is in this image?", imageUrl);
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: activeTopic,
          messages: nextMessages.map((message) => ({
            role: message.role,
            content: message.imageUrl
              ? [
                  { type: "text", text: message.content },
                  { type: "image_url", image_url: { url: message.imageUrl } },
                ]
              : message.content,
          })),
        }),
      });

      const data = await response.json();
      const replyText =
        response.ok && typeof data.reply === "string"
          ? data.reply
          : "I am facing a temporary issue right now. Please try again in a moment.";

      setMessages((prev) => [...prev, createMessage("assistant", replyText)]);
    } catch {
      setMessages((prev) => [
        ...prev,
        createMessage(
          "assistant",
          "I am unable to reach the server right now. Please try again shortly.",
        ),
      ]);
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    loading,
    activeTopic,
    suggestions,
    setActiveTopic,
    sendMessage,
    clearChat,
  };
}
