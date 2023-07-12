import JournalEntry from "./JournalEntry";

const JournalEntries = () => {
  const n = 10;
  const entries = new Array(n).fill(null).map((_, i) => i + 1);

  return (
    <div className="journal__entries">
      {entries.map((value) => (
        <JournalEntry key={value} />
      ))}
    </div>
  );
};

export default JournalEntries;
