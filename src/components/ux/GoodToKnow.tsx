type GoodToKnowProps = {
  notes: readonly string[];
  className?: string;
};

export function GoodToKnow({ notes, className }: GoodToKnowProps) {
  return (
    <div className={className}>
      <h3 className="text-xs font-extrabold uppercase tracking-[0.12em] text-accent">
        Good to know
      </h3>
      <ul className="mt-2 space-y-2">
        {notes.map((note) => (
          <li key={note} className="text-xs leading-6 text-foreground/70">
            {note}
          </li>
        ))}
      </ul>
    </div>
  );
}
