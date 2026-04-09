import { useState, useRef, useEffect } from "react";
import { Mic, Image as ImageIcon, X, SendHorizonal } from "lucide-react";

type ChatInputProps = {
  disabled?: boolean;
  onSend: (text: string, imageUrl?: string) => void;
};

export function ChatInput({ disabled, onSend }: ChatInputProps) {
  const [value, setValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  
  const recognitionRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;

        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setValue((prev) => (prev ? prev + " " + transcript : transcript));
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error", event.error);
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.start();
        setIsListening(true);
      } else {
        alert("Speech recognition is not supported in this browser.");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImageBase64(reader.result as string);
      reader.readAsDataURL(file);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const submit = () => {
    const text = value.trim();
    if ((!text && !imageBase64) || disabled) return;
    onSend(text, imageBase64 || undefined);
    setValue("");
    setImageBase64(null);
  };

  return (
    <div className="bg-[#1A1A1A] p-4 sm:p-6 sm:pb-8 w-full border-t border-zinc-800/60 z-10 relative">
      {imageBase64 && (
        <div className="mx-auto max-w-3xl mb-3 flex px-4">
          <div className="relative inline-block">
            <img src={imageBase64} alt="Preview" className="h-16 w-16 rounded-xl border border-zinc-700 object-cover shadow-lg" />
            <button
              onClick={() => setImageBase64(null)}
              className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600 shadow-sm"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}
      
      <div className="mx-auto flex w-full max-w-3xl items-center gap-2 rounded-full bg-[#242427] pl-3 pr-2 py-2 shadow-sm border border-zinc-700/50">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-zinc-400 transition hover:bg-zinc-700/50 hover:text-white"
          title="Upload Image"
        >
          <ImageIcon className="h-5 w-5" />
        </button>
        
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          className="hidden" 
        />
        
        <button
          type="button"
          onClick={toggleListening}
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition ${
            isListening ? "bg-red-500/20 text-red-500" : "text-zinc-400 hover:bg-zinc-700/50 hover:text-white"
          }`}
          title="Voice Input"
        >
          <Mic className={`h-5 w-5 ${isListening ? "animate-pulse" : ""}`} />
        </button>

        <input
          value={value}
          disabled={disabled}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              submit();
            }
          }}
          placeholder="Ask me anything..."
          className="flex-1 bg-transparent px-2 py-3 text-sm text-white outline-none placeholder:text-zinc-500 disabled:opacity-50"
        />
        
        <button
          type="button"
          onClick={submit}
          disabled={disabled || (!value.trim() && !imageBase64)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-700 hover:text-white transition disabled:cursor-not-allowed disabled:opacity-40"
        >
          <SendHorizonal className="h-5 w-5 ml-0.5" />
        </button>
      </div>
    </div>
  );
}
