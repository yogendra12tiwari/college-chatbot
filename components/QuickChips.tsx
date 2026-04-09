type QuickChipsProps = {
  suggestions: string[];
  onSelect: (value: string) => void;
};

export function QuickChips({ suggestions, onSelect }: QuickChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {suggestions.map((suggestion) => (
        <button
          key={suggestion}
          type="button"
          onClick={() => onSelect(suggestion)}
          className="rounded-full border border-amber-300/40 bg-amber-300/10 px-3 py-1 text-xs text-amber-100 hover:bg-amber-300/20"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
}
