"use client";

import Image from "next/image";

const TOPICS = [
  "Admissions",
  "Fees",
  "Courses",
  "Exams",
  "Hostel",
  "Placements",
  "Library",
] as const;

type SidebarProps = {
  activeTopic: string;
  onSelectTopic: (topic: string) => void;
};

export function Sidebar({ activeTopic, onSelectTopic }: SidebarProps) {
  return (
    <aside className="hidden h-full flex-col bg-[#121212] p-6 md:flex md:w-80 border-r border-[#1e1e1e]">
      <div className="mb-8 flex items-center gap-4 rounded-2xl bg-[#1e1e1e] p-4 shadow-sm">
        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
          <Image src="/logo.png" alt="SRMCEM Logo" fill className="object-contain p-1" />
        </div>
        <div>
          <h2 className="text-base font-bold text-white tracking-wide">SRMCEM Assistant</h2>
          <p className="text-xs font-medium text-zinc-400">Campus Chatbot</p>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3 px-2">Knowledge Base</p>
        <div className="space-y-1.5">
          {TOPICS.map((topic) => {
            const isActive = activeTopic === topic;
            return (
              <button
                key={topic}
                type="button"
                onClick={() => onSelectTopic(topic)}
                className={`w-full rounded-2xl px-4 py-3 text-left font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-[#FABC3F] text-black shadow-[0_0_15px_rgba(250,188,63,0.15)]"
                    : "bg-transparent text-zinc-400 hover:bg-[#1e1e1e] hover:text-white"
                }`}
              >
                {topic}
              </button>
            );
          })}
        </div>
      </div>
      
      <div className="mt-auto rounded-3xl bg-[#1e1e1e] p-5 text-center">
        <p className="text-xs font-medium leading-relaxed text-zinc-500">
          Powered by <span className="text-zinc-300">Groq</span><br/>and <span className="text-zinc-300">Llama 3 Vision</span>
        </p>
      </div>
    </aside>
  );
}
