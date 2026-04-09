"use client";

import { useEffect, useRef } from "react";
import { ChatInput } from "@/components/ChatInput";
import { MessageBubble } from "@/components/MessageBubble";
import { QuickChips } from "@/components/QuickChips";
import { Sidebar } from "@/components/Sidebar";
import { TypingIndicator } from "@/components/TypingIndicator";
import { useChat } from "@/hooks/useChat";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

export function ChatLayout() {
  const { messages, loading, activeTopic, suggestions, setActiveTopic, sendMessage, clearChat } =
    useChat();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [messages, loading]);

  return (
    <div className="flex bg-[#121212] text-white overflow-hidden h-screen font-sans">
      <Sidebar activeTopic={activeTopic} onSelectTopic={setActiveTopic} />

      <main className="flex flex-1 flex-col relative w-full h-full max-w-4xl mx-auto rounded-l-3xl shadow-2xl bg-[#1A1A1A] sm:border-l sm:border-zinc-800">
        <header className="flex items-center justify-between border-b border-zinc-800/80 px-6 py-5 sticky top-0 bg-[#1A1A1A]/95 backdrop-blur-sm z-10 rounded-tl-3xl">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-100">SRMCEM Campus Assistant</h1>
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest mt-0.5">Topic: <span className="text-[#FABC3F]">{activeTopic}</span></p>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-4">
            <a 
              href="https://www.instagram.com/srmcem_official?igsh=dmZpdnI5dGYzMzB5" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-zinc-500 transition-all hover:text-[#E1306C] hover:-translate-y-1 hover:drop-shadow-[0_0_8px_rgba(225,48,108,0.5)]"
              title="Follow us on Instagram"
            >
              <InstagramIcon className="h-[22px] w-[22px]" />
            </a>
            <a 
              href="https://www.linkedin.com/company/srmcem-lucknow/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-zinc-500 transition-all hover:text-[#0077B5] hover:-translate-y-1 hover:drop-shadow-[0_0_8px_rgba(0,119,181,0.5)]"
              title="Connect on LinkedIn"
            >
              <LinkedinIcon className="h-[22px] w-[22px]" />
            </a>

            {messages.length > 0 && (
              <div className="ml-2 border-l border-zinc-800 pl-4 hidden sm:block">
                <button 
                  onClick={clearChat}
                  className="rounded-full border border-zinc-700 bg-zinc-800 px-4 py-1.5 text-xs font-semibold text-zinc-300 transition hover:bg-zinc-700 hover:text-white"
                >
                  Clear Chat
                </button>
              </div>
            )}
          </div>
        </header>

        <section ref={containerRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-8 sm:px-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4 -mt-10">
              <h2 className="mb-3 text-4xl font-bold tracking-tight text-white">What Do You Want<br/>To Ask?</h2>
              <p className="mb-8 text-sm font-medium text-zinc-400">
                SRMCEM related questions supported
              </p>
              <QuickChips suggestions={suggestions} onSelect={sendMessage} />
            </div>
          ) : (
            messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))
          )}

          {loading ? <TypingIndicator /> : null}
        </section>

        <ChatInput disabled={loading} onSend={sendMessage} />
      </main>
    </div>
  );
}
