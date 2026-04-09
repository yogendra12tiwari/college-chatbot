export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 rounded-2xl bg-zinc-800 px-4 py-3 w-fit">
      <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-300 [animation-delay:0ms]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-300 [animation-delay:150ms]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-300 [animation-delay:300ms]" />
    </div>
  );
}
