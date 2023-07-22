import { useSelector } from "react-redux";
import JournalEntry from "./JournalEntry";
import { RootState } from "../../store/store";

const JournalEntries = () => {
  const { notes } = useSelector((state: RootState) => state.notes);

  return (
    <div className="journal__entries">
      {notes.map((note) => (
        <JournalEntry key={note.id} {...note} />
      ))}
    </div>
  );
};

export default JournalEntries;
