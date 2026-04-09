import type { ChatMessage } from "@/hooks/useChat";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ThumbsUp, ThumbsDown, User, Sparkle } from "lucide-react";
import { useState } from "react";

type MessageBubbleProps = {
  message: ChatMessage;
};

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);

  // Time formatting from mockup
  const timeStr = new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).replace(' AM', '').replace(' PM', '');

  return (
    <div className={`flex w-full mb-6 ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`flex max-w-[85%] sm:max-w-[75%] items-end gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
        
        {/* Avatar */}
        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-sm mb-1 ${
          isUser ? "bg-[#FABC3F] text-black" : "bg-gradient-to-br from-indigo-500 to-purple-600 text-white"
        }`}>
          {isUser ? <User className="h-4 w-4" strokeWidth={2.5} /> : <Sparkle className="h-4 w-4 fill-white" />}
        </div>
        
        {/* Bubble */}
        <div className="flex flex-col gap-1 w-full">
          {message.imageUrl && (
            <img src={message.imageUrl} alt="Uploaded attachment" className={`mb-1 max-h-48 w-auto object-contain shadow-sm ${isUser ? "rounded-l-2xl rounded-tr-2xl" : "rounded-r-2xl rounded-tl-2xl"}`} />
          )}
          
          <div
            className={`px-5 py-4 shadow-sm text-[15px] leading-relaxed ${
              isUser
                ? "bg-[#FABC3F] text-black rounded-t-[24px] rounded-l-[24px] rounded-br-sm"
                : "bg-[#252528] text-zinc-100 rounded-t-[24px] rounded-r-[24px] rounded-bl-sm border border-zinc-700/50"
            }`}
          >
            <div>
              {isUser ? (
                <p className="whitespace-pre-wrap font-medium">{message.content}</p>
              ) : (
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    p: ({node: _, ...props}) => <p className="mb-3 last:mb-0" {...props} />,
                    ul: ({node: _, ...props}) => <ul className="mb-3 list-disc pl-5 marker:text-zinc-500" {...props} />,
                    ol: ({node: _, ...props}) => <ol className="mb-3 list-decimal pl-5 marker:text-zinc-500" {...props} />,
                    li: ({node: _, ...props}) => <li className="mb-1" {...props} />,
                    a: ({node: _, ...props}) => <a className="text-[#FABC3F] underline underline-offset-2 hover:text-yellow-300" target="_blank" rel="noopener noreferrer" {...props} />,
                    strong: ({node: _, ...props}) => <strong className="font-semibold text-white" {...props} />,
                    code: ({node: _, ...props}) => <code className="bg-black/30 rounded px-1.5 py-0.5 text-amber-200 text-sm" {...props} />,
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              )}
            </div>
            
            {/* Metadata Footer */}
            <div className={`mt-2 flex items-center ${!isUser ? "justify-between" : "justify-end"}`}>
              {!isUser && (
                 <div className="flex gap-3">
                  <button
                    onClick={() => setFeedback("up")}
                    className={`transition scale-100 active:scale-95 ${feedback === "up" ? "text-green-400" : "text-zinc-500 hover:text-green-300"}`}
                    title="Helpful"
                  >
                    <ThumbsUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => setFeedback("down")}
                    className={`transition scale-100 active:scale-95 ${feedback === "down" ? "text-red-400" : "text-zinc-500 hover:text-red-300"}`}
                    title="Not helpful"
                  >
                    <ThumbsDown className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
              <span className={`text-[10px] font-medium tracking-wide ${isUser ? "text-black/50" : "text-zinc-500"}`}>{timeStr}</span>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
